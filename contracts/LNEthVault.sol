pragma solidity ^0.8.20;
// SPDX-License-Identifier: UNLICENSED
import {AccessControlEnumerable} from "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/// @title LongNecks Etheureum Vault
contract LNEthVault is Pausable, Ownable, AccessControlEnumerable {
    bytes32 public constant KEEPER_ROLE = keccak256("KEEPER");

    IERC721 public immutable LongNecksNFT;
    event SendToEth(address indexed from, address indexed to, uint256 tokenId);

    error LNEthVault__NotOwner();
    error LNEthVault__NotKeeper();

    modifier onlyKeeper() {
        if (!hasRole(KEEPER_ROLE, msg.sender)) {
            revert LNEthVault__NotKeeper();
        }
        _;
    }

    constructor(IERC721 _LongNecksNFT) {
        LongNecksNFT = _LongNecksNFT;
    }

    function sendToEth(address to, uint256 tokenId) external whenNotPaused {
        if (LongNecksNFT.ownerOf(tokenId) != msg.sender)
            revert LNEthVault__NotOwner();
        LongNecksNFT.transferFrom(msg.sender, address(this), tokenId);
        emit SendToEth(msg.sender, to, tokenId);
    }

    function receiveFromEth(address from, uint256 tokenId) external onlyOwner {
        LongNecksNFT.transferFrom(address(this), from, tokenId);
    }
}
