// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {IERC721} from '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import {ERC2981} from '@openzeppelin/contracts/token/common/ERC2981.sol';
import {ONFT721A} from './token/onft/extension/ONFT721A.sol';
import {DefaultOperatorFilterer} from 'operator-filter-registry/src/DefaultOperatorFilterer.sol';

contract LongNecksONFT is DefaultOperatorFilterer, ONFT721A, ERC2981 {
    uint256 public totalSupply;

    uint96 public constant ROYALTY_FEE = 500; // 5% of every sale

    string private baseURI;

    error LongNecksONFT__CallerNotMinter();
    error LongNecksONFT__CallerNotOwner();
    error LongNecksONFT__ClaimListFinalized();
    error LongNecksONFT__ClaimsListMustBeFinalized();
    error LongNecksONFT__FullyMinted();
    error LongNecksONFT__InvalidMintingChain();
    error LongNecksONFT__NoClaimAvailable();

    /// @param _layerZeroEndpoint Handles message transmission across chains
    /// @param __baseURI          URI endpoint to query metadata
    /// @param _minGas            Min amount of gas required to transfer, and also store the payload
    /// @param royaltyReceiver    Address of the recipient of royalties
    constructor(
        address _layerZeroEndpoint,
        string memory __baseURI,
        uint256 _minGas,
        address royaltyReceiver,
        address _owner
    ) ONFT721A('Long Necks ONFT', 'LN', _minGas, _layerZeroEndpoint) {
        baseURI = __baseURI;
        MAX_MINT_ID = _endMintId;
        minter = _minter;
        _setDefaultRoyalty(royaltyReceiver, ROYALTY_FEE);

        transferOwnership(_owner);
    }

    /// @notice Sets the baseURI for the token
    function setBaseURI(string memory __baseURI) external {
        _requireOwner();
        baseURI = __baseURI;
    }

    /// @notice Update the royalty recipient
    function setRoyaltiesRecipient(address newRecipient) external {
        _requireOwner();
        _setDefaultRoyalty(newRecipient, ROYALTY_FEE);
    }

    /// @dev Helper function to replace onlyOwner modifier
    /// @dev It is more bytecode efficient to have a function if reused multiple times
    function _requireOwner() internal view {
        if (_msgSender() != owner()) {
            revert LongNecksONFT__CallerNotOwner();
        }
    }

    /// @dev Returns the chain ID of the current network
    function _getChainId() internal view virtual returns (uint256) {
        uint256 chainId;
        assembly {
            chainId := chainid()
        }
        return chainId;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC2981, ONFT721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /// @dev Returns the initialized base URI
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    // --------Blacklist Overrides--------//
    function setApprovalForAll(
        address operator,
        bool approved
    ) public override(ERC721, IERC721) onlyAllowedOperatorApproval(operator) {
        super.setApprovalForAll(operator, approved);
    }

    function approve(
        address operator,
        uint256 tokenId
    ) public override(ERC721, IERC721) onlyAllowedOperatorApproval(operator) {
        super.approve(operator, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) onlyAllowedOperator(from) {
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override(ERC721, IERC721) onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId, data);
    }
}