import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { LZ_OPTIONS, ChainID } from '../deploy/constants';
import { getLzOptionsByChainName, readDeployments } from '../utils';
import { LzApp, LzApp__factory } from '../../typechain';
export const setPacketType__task = async (
    args: {
        chainnames: string;
    },
    hre: HardhatRuntimeEnvironment,
) => {
    const { ethers } = hre;
    const signer = (await ethers.getSigners())[0];
    const chainName = (
        hre.network.name as string
    ).toUpperCase() as keyof typeof ChainID;
    const chainID = ChainID[chainName] as keyof typeof LZ_OPTIONS;
    const lzChainIDs = args.chainnames.split(',').map((x) => {
        const lzChainID = getLzOptionsByChainName(x)?.lzChainId ?? '0';
        if (lzChainID === '0') {
            throw new Error(`LayerZero Chain ID not found for ${x}`);
        }
        return lzChainID;
    });

    console.log(
        `Setting ${lzChainIDs.length} packet types for ${chainName}...`,
    );
    const deployment = readDeployments()[chainID].find(
        (x) => x['LongNecksONFT'] || x['LongNecksGate'],
    ) ?? { ERC721Mock: { address: '0x' } };
    const contractAddress: string =
        // @ts-ignore
        (
            deployment['LongNecksONFT'] ??
            // @ts-ignore
            deployment['LongNecksGate']
        ).address ?? '0x';
    if (contractAddress === '0x') {
        throw new Error('Contract address not found');
    }
    const contract = new ethers.Contract(
        contractAddress,
        LzApp__factory.abi,
        signer,
    ) as LzApp;
    for (let i = 0; i < lzChainIDs.length; i++) {
        const _chainId = lzChainIDs[i];
        const tx = await contract.setMinDstGas(_chainId, 1, 200000);
        await tx.wait();
        console.log(
            `Set min gas ${i + 1}/${lzChainIDs.length} for ${chainName}`,
        );
        console.log(`tx: ${tx.hash}`);
    }
};
