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
dotenv.config();
task('deployLNGate', 'Deploy LongNecksGate contract').setAction(
    deployLNGate__task,
);
task('deployLNONFT', 'Deploy an ONFT contract').setAction(deployLNONFT__task);
const config: HardhatUserConfig = {
    solidity: '0.8.20',
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
