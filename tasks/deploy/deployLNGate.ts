import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {
    CANTO_LONG_NECKS_ADDRESS,
    LZ_OPTIONS,
    ChainID,
    LONG_NECKS_BASE_URI,
} from './constants';
import { readDeployments, saveDeployment } from '../utils';
import inquirer from 'inquirer';
export const deployLNGate__task = async (
    args: any,
    hre: HardhatRuntimeEnvironment,
) => {
    const { ethers } = hre;
    const chainName = (
        hre.network.name as string
    ).toUpperCase() as keyof typeof ChainID;
    const chainID = ChainID[chainName] as keyof typeof LZ_OPTIONS;
    if (
        chainName.toLowerCase() !== 'canto' &&
        chainName.toLowerCase() !== 'canto_testnet'
    ) {
        throw new Error(
            'Long Necks Gate can only be deployed on the Canto network',
        );
    }

    let longNecksAddr = CANTO_LONG_NECKS_ADDRESS;
    console.log('Deploying Long Necks Gate');

    if (chainName.toLowerCase() === 'canto_testnet') {
        if (
            (
                await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'confirm',
                        message: `Do you want to deploy a Long Necks ERC721 Mock on ${chainName}?`,
                    },
                ])
            ).confirm === true
        ) {
            console.log('Deploying Long Necks ERC721 Mock');
            const longNecksFactory = await ethers.getContractFactory(
                'ERC721Mock',
            );
            const longNecks = await longNecksFactory.deploy('Long Necks', 'LN');
            longNecksAddr = longNecks.address;
            await longNecks.deployed();
            await longNecks.setBaseURI(LONG_NECKS_BASE_URI);
            saveDeployment(chainID, [
                {
                    ERC721Mock: {
                        address: longNecks.address,
                        deploymentTxHash: longNecks.deployTransaction.hash,
                        constructorArgs: ['Long Necks', 'LN'],
                    },
                },
            ]);
        } else {
            const lnInstance = readDeployments()[chainID].find(
                (x) => x['ERC721Mock'],
            ) ?? { ERC721Mock: { address: '' } };
            longNecksAddr = lnInstance['ERC721Mock'].address;
        }
    }
    if (longNecksAddr === '') {
        throw new Error('Long Necks address is empty');
    }
    const lnGateFactory = await ethers.getContractFactory(
        'LongOmnichainNeckGate',
    );
    const lnGate = await lnGateFactory.deploy(
        longNecksAddr,
        LZ_OPTIONS[chainID]!.lzEndpointAddr,
        LZ_OPTIONS[chainID]!.minGas,
    );
    const deployTx = await lnGate.deployTransaction.wait();
    saveDeployment(chainID, [
        {
            LongNecksGate: {
                address: lnGate.address,
                deploymentTxHash: deployTx.transactionHash,
                constructorArgs: [
                    CANTO_LONG_NECKS_ADDRESS,
                    LZ_OPTIONS[chainID]!.lzEndpointAddr,
                    LZ_OPTIONS[chainID]!.minGas,
                ],
            },
        },
    ]);
    console.log('Long Necks Gate deployed to:', lnGate.address);
    console.log('Deployment saved');
};
