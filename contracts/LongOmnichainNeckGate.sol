pragma solidity ^0.8.18;
// SPDX-License-Identifier: UNLICENSED
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {NonblockingLzApp} from "./lzApp/NonblockingLzApp.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {ONFT721Core} from "./token/onft/ONFT721Core.sol";

/// @title LongNecks Etheureum Vault
contract LongOmnichainNeckGate is Ownable, ONFT721Core {
    IERC721 public immutable LongNecksNFT;

    event LongOmnichainNeckGate__RescuedToken(uint256 tokenId, address to);

    error LongOmnichainNeckGate__NotOwner();
    error LongOmnichainNeckGate__NotKeeper();
    error LongOmnichainNeckGate__TransferFromFailed(
        address from,
        address to,
        uint256 tokenId
    );

    constructor(
        IERC721 _LongNecksNFT,
        address _lzEndpoint,
        uint256 _minGasToTransferAndStore
    ) ONFT721Core(_minGasToTransferAndStore, _lzEndpoint) {
        LongNecksNFT = _LongNecksNFT;
    }

    function rescueToken(
        uint256 _tokenId,
        address _toAddress
    ) public onlyOwner {
        _creditTo(0, _toAddress, _tokenId);
        emit LongOmnichainNeckGate__RescuedToken(_tokenId, _toAddress);
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
        if (_from != msg.sender) {
            revert LongOmnichainNeckGate__NotOwner();
        }
        (bool success, ) = address(LongNecksNFT).call(
            abi.encodeWithSelector(
                LongNecksNFT.transferFrom.selector,
                _from,
                address(this),
                _tokenId
            )
        );
        if (!success)
            revert LongOmnichainNeckGate__TransferFromFailed(
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
            revert LongOmnichainNeckGate__TransferFromFailed(
                address(this),
                _toAddress,
                _tokenId
            );
    }
}
