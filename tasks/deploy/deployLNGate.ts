import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { CANTO_LONG_NECKS_ADDRESS, LZ_OPTIONS, ChainID } from './constants';
import { saveDeployment } from '../utils';
// TODO: Create a deployment logging system
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
    const lnGateFactory = await ethers.getContractFactory(
        'LongOmnichainNeckGate',
    );
    const lnGate = await lnGateFactory.deploy(
        CANTO_LONG_NECKS_ADDRESS,
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
};
