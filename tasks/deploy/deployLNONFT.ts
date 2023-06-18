import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {
    LZ_OPTIONS,
    ChainID,
    LONG_NECKS_BASE_URI,
    LONG_NECKS_ROYALITY_RECEPIENT_ADDRESS,
    LONG_NECKS_OWNER_ADDRESS,
} from './constants';
import { saveDeployment } from '../utils';
export const deployLNONFT__task = async (
    args: any,
    hre: HardhatRuntimeEnvironment,
) => {
    const { ethers } = hre;
    const chainName = (
        hre.network.name as string
    ).toUpperCase() as keyof typeof ChainID;
    const chainID = ChainID[chainName] as keyof typeof LZ_OPTIONS;
    console.log(`Deploying Long Necks ONFT on ${chainName}`);
    const lnONFTFactory = await ethers.getContractFactory('LongNecksONFT');
    const lnONFT = await lnONFTFactory.deploy(
        LZ_OPTIONS[chainID]!.lzEndpointAddr,
        LONG_NECKS_BASE_URI,
        LZ_OPTIONS[chainID]!.minGas,
        LONG_NECKS_ROYALITY_RECEPIENT_ADDRESS,
        LONG_NECKS_OWNER_ADDRESS,
    );
    const deployTx = await lnONFT.deployTransaction.wait();
    saveDeployment(chainID, [
        {
            LongNecksONFT: {
                address: lnONFT.address,
                deploymentTxHash: deployTx.transactionHash,
                constructorArgs: [
                    LZ_OPTIONS[chainID]!.lzEndpointAddr,
                    LONG_NECKS_BASE_URI,
                    LZ_OPTIONS[chainID]!.minGas,
                    LONG_NECKS_ROYALITY_RECEPIENT_ADDRESS,
                    LONG_NECKS_OWNER_ADDRESS,
                ],
            },
        },
    ]);
    console.log(`Long Necks ONFT deployed at ${lnONFT.address}`);
    console.log('Deployment saved');
};
