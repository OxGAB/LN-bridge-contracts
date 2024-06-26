import * as dotenv from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-chai-matchers';
import { HardhatUserConfig, task } from 'hardhat/config';
import 'hardhat-deploy';
import 'hardhat-contract-sizer';
import 'hardhat-gas-reporter';
import 'hardhat-tracer';
import '@primitivefi/hardhat-dodoc';
import 'hardhat-abi-exporter';
import '@nomicfoundation/hardhat-toolbox';
import { deployLNGate__task } from './tasks/deploy/deployLNGate';
import { deployLNONFT__task } from './tasks/deploy/deployLNONFT';
import { setTrustedRemotes__task } from './tasks/execs/setTrustedRemote';
import { mintLN__task } from './tasks/execs/testnet/mintLN';
import { sendFrom__task } from './tasks/execs/sendFrom';
import { setPacketType__task } from './tasks/execs/setPacketType';
import { setBatchLimit__task } from './tasks/execs/setBatchLimit';
import { transferLN__task } from './tasks/execs/transfer';
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
    .addOptionalParam('start', 'The TokenID to start minting at')
    .addOptionalParam('end', 'The TokenID to stop minting at')
    .addOptionalParam('to', 'The address to mint to');
task('transferLN', 'Transfer Long Necks')
    .setAction(transferLN__task)
    .addParam('to', 'The address to receive tokens')
    .addParam('start', 'The TokenID to start transfering at')
    .addParam('end', 'The TokenID to stop transfering at');
task('sendFrom', 'Send Long Necks from one chain to another')
    .addParam('dstchain', 'The destination chain name')
    .addOptionalParam('to', 'The address to send to')
    .addOptionalParam('tokenids', 'The token IDs to send')
    .setAction(sendFrom__task);
task('setPacketType', 'Set packet type for a chain')
    .addParam('chainnames', 'The chain names to set seperated by a comma (,)')
    .setAction(setPacketType__task);
task('setBatchLimit', 'Set send batch limits for a chain')
    .addParam('chainnames', 'The chain names to set seperated by a comma (,)')
    .setAction(setBatchLimit__task);
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
