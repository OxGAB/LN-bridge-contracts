import * as dotenv from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-chai-matchers';
import { HardhatUserConfig, task } from 'hardhat/config';
import 'hardhat-deploy';
import 'hardhat-contract-sizer';
import 'hardhat-gas-reporter';
import 'hardhat-tracer';
import '@primitivefi/hardhat-dodoc';

import '@nomicfoundation/hardhat-toolbox';
import { deployLNGate__task } from './tasks/deploy/deployLNGate';
import { deployLNONFT__task } from './tasks/deploy/deployLNONFT';
import { setTrustedRemotes__task } from './tasks/execs/setTrustedRemote';
import { mintLN__task } from './tasks/execs/mintLN';
import { sendFrom__task } from './tasks/execs/sendFrom';
import { setPacketType__task } from './tasks/execs/setPacketType';
dotenv.config();
task('deployLNGate', 'Deploy LongNecksGate contract').setAction(
    deployLNGate__task,
);
task('deployLNONFT', 'Deploy an ONFT contract').setAction(deployLNONFT__task);
task('setTrustedRemotes', 'Set trusted remotes for contract on a certain chain')
    .setAction(setTrustedRemotes__task)
    .addParam('remotes', 'The remotes to set');
task('mintLN', 'Mint Long Necks')
    .setAction(mintLN__task)
    .addOptionalParam('number', 'The number of Long Necks to mint')
    .addOptionalParam('to', 'The address to mint to');
task('sendFrom', 'Send Long Necks from one chain to another')
    .addParam('dstchainid', 'The destination chain ID')
    .addOptionalParam('to', 'The address to send to')
    .addOptionalParam('tokenids', 'The token IDs to send')
    .setAction(sendFrom__task);
task('setPacketType', 'Set packet type for a chain')
    .addParam('chainids', 'The chain IDs to set')
    .setAction(setPacketType__task);
const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: '0.8.19',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 400,
                    },
                },
            },
        ],
    },
    defaultNetwork: 'hardhat',
    networks: {
        hardhat: {
            // forking: {
            //     blockNumber: 16963096,
            //     url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            // },
            // hardfork: 'merge',
            allowUnlimitedContractSize: true,
            accounts: {
                mnemonic:
                    'test test test test test test test test test test test junk',
                count: 10,
                accountsBalance: '1000000000000000000000',
            },
            tags: ['testnet'],
        },
        ethereum: {
            url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [process.env.DEPLOYER_PRIVATE_KEY ?? ''],
        },
        canto: {
            url: 'https://canto.gravitychain.io/',
            accounts: [process.env.DEPLOYER_PRIVATE_KEY ?? ''],
        },
        goerli: {
            url: 'https://eth-goerli.g.alchemy.com/v2/y3AHtuPXeT_xBBkIgiRKczs2sTAVjCid',
            accounts: [process.env.DEPLOYER_PRIVATE_KEY ?? ''],
        },
        canto_testnet: {
            url: 'https://canto-testnet.plexnode.wtf/',
            accounts: [process.env.DEPLOYER_PRIVATE_KEY ?? ''],
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    typechain: {
        outDir: 'typechain',
        target: 'ethers-v5',
    },
    gasReporter: {
        enabled: false,
    },
    mocha: {
        timeout: 4000000,
    },
    dodoc: {
        runOnCompile: true,
        freshOutput: true,
    },
};

export default config;
