pragma solidity ^0.8.20;
// SPDX-License-Identifier: UNLICENSED
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {NonblockingLzApp} from "./lzApp/NonblockingLzApp.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IONFT721Core} from "./token/onft/IONFT721Core.sol";

// TODO: add credit to and debit from implementation
/// @title LongNecks Etheureum Vault
contract LongNecksEthVault is Ownable, NonblockingLzApp, ERC165 {
    IERC721 public immutable LongNecksNFT;
    uint16 public constant FUNCTION_TYPE_SEND = 1;
    uint16 public immutable ETH_CHAIN_ID;

    /**
     * @dev Emitted when `_tokenIds[]` are moved from the `_sender` to (`_dstChainId`, `_toAddress`)
     * `_nonce` is the outbound nonce from
     */
    event SendToChain(
        uint16 indexed _dstChainId,
        address indexed _from,
        bytes indexed _toAddress,
        uint[] _tokenIds
    );
    event ReceiveFromChain(
        uint16 indexed _srcChainId,
        bytes indexed _srcAddress,
        address indexed _toAddress,
        uint[] _tokenIds
    );
    event SetMinGasToTransferAndStore(uint256 _minGasToTransferAndStore);
    event SetDstChainIdToTransferGas(
        uint16 _dstChainId,
        uint256 _dstChainIdToTransferGas
    );
    event SetDstChainIdToBatchLimit(
        uint16 _dstChainId,
        uint256 _dstChainIdToBatchLimit
    );

    /**
     * @dev Emitted when `_payload` was received from lz, but not enough gas to deliver all tokenIds
     */
    event CreditStored(bytes32 _hashedPayload, bytes _payload);
    /**
     * @dev Emitted when `_hashedPayload` has been completely delivered
     */
    event CreditCleared(bytes32 _hashedPayload);
    event SendToEth(
        address indexed from,
        address indexed to,
        uint256[] tokenIds
    );
    event ReceiveFromEth(
        address indexed from,
        address indexed to,
        uint256[] tokenIds
    );

    error LNEthVault__NotOwner();
    error LNEthVault__NotKeeper();
    error LNEthVault__TransferFromFailed(
        address from,
        address to,
        uint256 tokenId
    );

    struct StoredCredit {
        uint16 srcChainId;
        address toAddress;
        uint256 index; // which index of the tokenIds remain
        bool creditsRemain;
    }

    uint256 public minGasToTransferAndStore; // min amount of gas required to transfer, and also store the payload
    mapping(uint16 => uint256) public dstChainIdToBatchLimit;
    mapping(uint16 => uint256) public dstChainIdToTransferGas; // per transfer amount of gas required to mint/transfer on the dst
    mapping(bytes32 => StoredCredit) public storedCredits;

    constructor(
        IERC721 _LongNecksNFT,
        address _lzEndpoint,
        uint256 _minGasToTransferAndStore,
        uint16 _ethChainId
    ) NonblockingLzApp(_lzEndpoint) {
        require(
            _minGasToTransferAndStore > 0,
            "minGasToTransferAndStore must be > 0"
        );
        minGasToTransferAndStore = _minGasToTransferAndStore;
        LongNecksNFT = _LongNecksNFT;
        ETH_CHAIN_ID = _ethChainId;
    }

    function sendToEth(
        address _toAddress,
        uint256 _tokenId,
        address payable _refundAddress,
        address _zroPaymentAddress,
        bytes memory _adapterParams
    ) external payable {
        (bool success, ) = address(LongNecksNFT).call(
            abi.encodeWithSelector(
                IERC721.transferFrom.selector,
                msg.sender,
                address(this),
                _tokenId
            )
        );
        if (!success)
            revert LNEthVault__TransferFromFailed(
                address(this),
                _toAddress,
                _tokenId
            );
        _send(
            msg.sender,
            ETH_CHAIN_ID,
            abi.encodePacked(_toAddress),
            _toSingletonArray(_tokenId),
            _refundAddress,
            _zroPaymentAddress,
            _adapterParams
        );
        emit SendToEth(msg.sender, _toAddress, _toSingletonArray(_tokenId));
    }

    function sendBatchToEth(
        address _toAddress,
        uint256[] memory _tokenIds,
        address payable _refundAddress,
        address _zroPaymentAddress,
        bytes memory _adapterParams
    ) external payable {
        for (uint i = 0; i < _tokenIds.length; i++) {
            (bool success, ) = address(LongNecksNFT).call(
                abi.encodeWithSelector(
                    IERC721.transferFrom.selector,
                    msg.sender,
                    address(this),
                    _tokenIds[i]
                )
            );
            if (!success)
                revert LNEthVault__TransferFromFailed(
                    msg.sender,
                    address(this),
                    _tokenIds[i]
                );
        }
        _send(
            msg.sender,
            ETH_CHAIN_ID,
            abi.encodePacked(_toAddress),
            _tokenIds,
            _refundAddress,
            _zroPaymentAddress,
            _adapterParams
        );
        emit SendToEth(msg.sender, _toAddress, _tokenIds);
    }

    function estimateSendFee(
        uint16 _dstChainId,
        bytes memory _toAddress,
        uint _tokenId,
        bool _useZro,
        bytes memory _adapterParams
    ) public view virtual returns (uint nativeFee, uint zroFee) {
        return
            estimateSendBatchFee(
                _dstChainId,
                _toAddress,
                _toSingletonArray(_tokenId),
                _useZro,
                _adapterParams
            );
    }

    function estimateSendBatchFee(
        uint16 _dstChainId,
        bytes memory _toAddress,
        uint[] memory _tokenIds,
        bool _useZro,
        bytes memory _adapterParams
    ) public view virtual returns (uint nativeFee, uint zroFee) {
        bytes memory payload = abi.encode(_toAddress, _tokenIds);
        return
            lzEndpoint.estimateFees(
                _dstChainId,
                address(this),
                payload,
                _useZro,
                _adapterParams
            );
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165) returns (bool) {
        return interfaceId == type(IONFT721Core).interfaceId || super.supportsInterface(interfaceId);
    }
    function _send(
        address _from,
        uint16 _dstChainId,
        bytes memory _toAddress,
        uint[] memory _tokenIds,
        address payable _refundAddress,
        address _zroPaymentAddress,
        bytes memory _adapterParams
    ) internal virtual {
        // allow 1 by default
        require(_tokenIds.length > 0, "tokenIds[] is empty");
        require(
            _tokenIds.length == 1 ||
                _tokenIds.length <= dstChainIdToBatchLimit[_dstChainId],
            "batch size exceeds dst batch limit"
        );

        // for (uint i = 0; i < _tokenIds.length; i++) {
        //     _debitFrom(_from, _dstChainId, _toAddress, _tokenIds[i]);
        // }

        bytes memory payload = abi.encode(_toAddress, _tokenIds);

        _checkGasLimit(
            _dstChainId,
            FUNCTION_TYPE_SEND,
            _adapterParams,
            dstChainIdToTransferGas[_dstChainId] * _tokenIds.length
        );
        _lzSend(
            _dstChainId,
            payload,
            _refundAddress,
            _zroPaymentAddress,
            _adapterParams,
            msg.value
        );
        emit SendToChain(_dstChainId, _from, _toAddress, _tokenIds);
    }

    function _nonblockingLzReceive(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64 /*_nonce*/,
        bytes memory _payload
    ) internal virtual override {
        // decode and load the toAddress
        (bytes memory toAddressBytes, uint[] memory tokenIds) = abi.decode(
            _payload,
            (bytes, uint[])
        );

        address toAddress;
        assembly {
            toAddress := mload(add(toAddressBytes, 20))
        }

        uint nextIndex = _creditTill(_srcChainId, toAddress, 0, tokenIds);
        if (nextIndex < tokenIds.length) {
            // not enough gas to complete transfers, store to be cleared in another tx
            bytes32 hashedPayload = keccak256(_payload);
            storedCredits[hashedPayload] = StoredCredit(
                _srcChainId,
                toAddress,
                nextIndex,
                true
            );
            emit CreditStored(hashedPayload, _payload);
        }

        emit ReceiveFromChain(_srcChainId, _srcAddress, toAddress, tokenIds);
    }

    // Public function for anyone to clear and deliver the remaining batch sent tokenIds
    function clearCredits(bytes memory _payload) external virtual {
        bytes32 hashedPayload = keccak256(_payload);
        require(
            storedCredits[hashedPayload].creditsRemain,
            "no credits stored"
        );

        (, uint[] memory tokenIds) = abi.decode(_payload, (bytes, uint[]));

        uint nextIndex = _creditTill(
            storedCredits[hashedPayload].srcChainId,
            storedCredits[hashedPayload].toAddress,
            storedCredits[hashedPayload].index,
            tokenIds
        );
        require(
            nextIndex > storedCredits[hashedPayload].index,
            "not enough gas to process credit transfer"
        );

        if (nextIndex == tokenIds.length) {
            // cleared the credits, delete the element
            delete storedCredits[hashedPayload];
            emit CreditCleared(hashedPayload);
        } else {
            // store the next index to mint
            storedCredits[hashedPayload] = StoredCredit(
                storedCredits[hashedPayload].srcChainId,
                storedCredits[hashedPayload].toAddress,
                nextIndex,
                true
            );
        }
    }

    // When a srcChain has the ability to transfer more chainIds in a single tx than the dst can do.
    // Needs the ability to iterate and stop if the minGasToTransferAndStore is not met
    function _creditTill(
        uint16 _srcChainId,
        address _toAddress,
        uint _startIndex,
        uint[] memory _tokenIds
    ) internal returns (uint256) {
        uint i = _startIndex;
        while (i < _tokenIds.length) {
            // if not enough gas to process, store this index for next loop
            if (gasleft() < minGasToTransferAndStore) break;

            // _creditTo(_srcChainId, _toAddress, _tokenIds[i]);
            i++;
        }

        // indicates the next index to send of tokenIds,
        // if i == tokenIds.length, we are finished
        return i;
    }

    function setMinGasToTransferAndStore(
        uint256 _minGasToTransferAndStore
    ) external onlyOwner {
        require(
            _minGasToTransferAndStore > 0,
            "minGasToTransferAndStore must be > 0"
        );
        minGasToTransferAndStore = _minGasToTransferAndStore;
        emit SetMinGasToTransferAndStore(_minGasToTransferAndStore);
    }

    // ensures enough gas in adapter params to handle batch transfer gas amounts on the dst
    function setDstChainIdToTransferGas(
        uint16 _dstChainId,
        uint256 _dstChainIdToTransferGas
    ) external onlyOwner {
        require(
            _dstChainIdToTransferGas > 0,
            "dstChainIdToTransferGas must be > 0"
        );
        dstChainIdToTransferGas[_dstChainId] = _dstChainIdToTransferGas;
        emit SetDstChainIdToTransferGas(_dstChainId, _dstChainIdToTransferGas);
    }

    // limit on src the amount of tokens to batch send
    function setDstChainIdToBatchLimit(
        uint16 _dstChainId,
        uint256 _dstChainIdToBatchLimit
    ) external onlyOwner {
        require(
            _dstChainIdToBatchLimit > 0,
            "dstChainIdToBatchLimit must be > 0"
        );
        dstChainIdToBatchLimit[_dstChainId] = _dstChainIdToBatchLimit;
        emit SetDstChainIdToBatchLimit(_dstChainId, _dstChainIdToBatchLimit);
    }

    function _toSingletonArray(
        uint element
    ) internal pure returns (uint[] memory) {
        uint[] memory array = new uint[](1);
        array[0] = element;
        return array;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }

    function _receiveFromEth(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        (bool success, ) = address(LongNecksNFT).call(
            abi.encodeWithSelector(
                LongNecksNFT.transferFrom.selector,
                address(this),
                to,
                tokenId
            )
        );
        if (!success)
            revert LNEthVault__TransferFromFailed(address(this), to, tokenId);
        emit ReceiveFromEth(from, to, _toSingletonArray(tokenId));
    }

    function _receiveBatchFromEth(
        address from,
        address to,
        uint256[] memory tokenIds
    ) internal {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            (bool success, ) = address(LongNecksNFT).call(
                abi.encodeWithSelector(
                    LongNecksNFT.transferFrom.selector,
                    address(this),
                    to,
                    tokenIds[i]
                )
            );
            if (!success)
                revert LNEthVault__TransferFromFailed(
                    address(this),
                    to,
                    tokenIds[i]
                );
        }
        emit ReceiveFromEth(from, to, tokenIds);
    }
}
