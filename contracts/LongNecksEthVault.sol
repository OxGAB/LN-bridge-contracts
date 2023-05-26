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
        uint16 _ethChainId
    ) ONFT721Core(_minGasToTransferAndStore, _lzEndpoint) {
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
            revert LongNecksEthVault__TransferFromFailed(
                address(this),
                to,
                tokenId
            );
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
                revert LongNecksEthVault__TransferFromFailed(
                    address(this),
                    to,
                    tokenIds[i]
                );
        }
        emit ReceiveFromEth(from, to, tokenIds);
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
