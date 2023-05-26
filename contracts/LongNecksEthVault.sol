pragma solidity ^0.8.20;
// SPDX-License-Identifier: UNLICENSED
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {NonblockingLzApp} from "./lzApp/NonblockingLzApp.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {ONFT721Core} from "./token/onft/ONFT721Core.sol";

/// @title LongNecks Etheureum Vault
contract LongNecksEthVault is Ownable, ONFT721Core {
    IERC721 public immutable LongNecksNFT;
    uint16 public immutable ETH_CHAIN_ID;

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

    error LongNecksEthVault__NotOwner();
    error LongNecksEthVault__NotKeeper();
    error LongNecksEthVault__TransferFromFailed(
        address from,
        address to,
        uint256 tokenId
    );
    error LongNecksEthVault__NotImplemented();

    constructor(
        IERC721 _LongNecksNFT,
        address _lzEndpoint,
        uint256 _minGasToTransferAndStore,
        uint16 _ethChainId,
        address _LongNecksONFT
    ) ONFT721Core(_minGasToTransferAndStore, _lzEndpoint) {
        ETH_CHAIN_ID = _ethChainId;
        LongNecksNFT = _LongNecksNFT;
        trustedRemoteLookup[ETH_CHAIN_ID] = abi.encodePacked(
            abi.encodePacked(_LongNecksONFT),
            address(this)
        );
        emit SetTrustedRemoteAddress(
            ETH_CHAIN_ID,
            abi.encodePacked(_LongNecksONFT)
        );
    }

    function sendToEth(
        address _toAddress,
        uint256 _tokenId,
        address payable _refundAddress,
        address _zroPaymentAddress,
        bytes memory _adapterParams
    ) external payable {
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

    function _nonblockingLzReceive(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64 /*_nonce*/,
        bytes memory _payload
    ) internal override {
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

        emit ReceiveFromEth(_bytesToAddress(_srcAddress), toAddress, tokenIds);
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

    function _debitFrom(
        address _from,
        uint16,
        bytes memory,
        uint _tokenId
    ) internal virtual override {
        (bool success, ) = address(LongNecksNFT).call(
            abi.encodeWithSelector(
                LongNecksNFT.transferFrom.selector,
                _from,
                address(this),
                _tokenId
            )
        );
        if (!success)
            revert LongNecksEthVault__TransferFromFailed(
                _from,
                address(this),
                _tokenId
            );
    }

    function _creditTo(
        uint16,
        address _toAddress,
        uint _tokenId
    ) internal virtual override {
        (bool success, ) = address(LongNecksNFT).call(
            abi.encodeWithSelector(
                LongNecksNFT.transferFrom.selector,
                address(this),
                _toAddress,
                _tokenId
            )
        );
        if (!success)
            revert LongNecksEthVault__TransferFromFailed(
                address(this),
                _toAddress,
                _tokenId
            );
    }

    function _bytesToAddress(
        bytes memory bys
    ) private pure returns (address addr) {
        assembly {
            addr := mload(add(bys, 20))
        }
    }

    function sendFrom(
        address,
        uint16,
        bytes memory,
        uint,
        address payable,
        address,
        bytes memory
    ) public payable override {
        revert LongNecksEthVault__NotImplemented();
    }

    function sendBatchFrom(
        address,
        uint16,
        bytes memory,
        uint[] memory,
        address payable,
        address,
        bytes memory
    ) public payable override {
        revert LongNecksEthVault__NotImplemented();
    }
}
