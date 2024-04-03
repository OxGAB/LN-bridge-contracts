# Canto LongNecks x LayerZero

Using LayerZero technology to facilitate the bridging of Canto LongNecks NFTs from the Canto network to the Ethereum network,
the LongNecksONFT contract represents the Canto LongNecks NFTs, extending the ERC721 standard for non-fungible tokens with additional features. The LongOmnichainNeckGate contract acts as a gateway for these NFTs, handling the transfer between networks.

When an NFT is sent from the Canto network, it is received by the LongOmnichainNeckGate contract on Canto, which then mints a corresponding ONFT on Ethereum.

This process is facilitated by LayerZero's cross-chain communication technology, allowing for seamless and secure transfer of NFTs between different blockchain networks.

## LongNecksONFT

`LongNecksONFT` is a contract that extends the ERC721 standard for non-fungible tokens (NFTs) with additional functionality. It includes a royalty fee for every sale, and the ability to set a base URI for the token and update the royalty recipient. The contract also includes error handling for cases where the caller is not the owner or approved.

## LongOmnichainNeckGate

`LongOmnichainNeckGate` is a contract that acts as a gate for the LongNecksNFT tokens. It includes functionality to rescue tokens and handle received ERC721 tokens. The contract also includes error handling for cases where the caller is not the owner or keeper, or if a transfer fails.

## Test Utilities

The `test.utils.ts` file includes utility functions for registering and testing the contracts. It includes functions to register the `LongNecksONFT` and `LongOmnichainNeckGate` contracts, as well as an ERC721 mock contract and a Layer Zero endpoint.

## Deployment Tasks

The project includes tasks for deploying the contracts, such as `deployLNGate.ts` and `sendFrom.ts`. These tasks use the Hardhat development environment and the Ethers.js library to interact with blockchain.

Please refer to the individual contract files and test utilities for more detailed information.