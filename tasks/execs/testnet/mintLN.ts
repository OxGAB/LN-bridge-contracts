import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { LZ_OPTIONS, ChainID } from '../../deploy/constants';
import { readDeployments } from '../../utils';
import { ERC721Mock, ERC721Mock__factory } from '../../../typechain';
export const mintLN__task = async (
    args: {
        start?: string;
        end?: string;
        to?: string;
    },
    hre: HardhatRuntimeEnvironment,
) => {
    const { ethers } = hre;
    const signer = (await ethers.getSigners())[0];
    const chainName = (
        hre.network.name as string
    ).toUpperCase() as keyof typeof ChainID;
    const chainID = ChainID[chainName] as keyof typeof LZ_OPTIONS;
    if (
        chainName.toLowerCase() !== 'canto' &&
        chainName.toLowerCase() !== 'canto_testnet'
    ) {
        throw new Error('Long Necks can only be minted on the Canto network');
    }
    const start = isNaN(Number(args.start)) ? 1 : Number(args.start);
    const end = isNaN(Number(args.end)) ? 1 : Number(args.end);
    const to = args.to ?? signer.address;
    const deployment = readDeployments()[chainID].find(
        (x) => x['ERC721Mock'],
    ) ?? { ERC721Mock: { address: '0x' } };
    const contractAddress: string = deployment['ERC721Mock'].address ?? '0x';
    if (contractAddress === '0x') {
        throw new Error('Contract address not found');
    }
    const longNecks = new ethers.Contract(
        contractAddress,
        ERC721Mock__factory.abi,
        signer,
    ) as ERC721Mock;
    console.log(`Minting ${end - start} Long Necks to ${to}...`);
    for (let i = start; i < end; i++) {
        const tx = await longNecks.mint(to, i);
        await tx.wait();
        console.log(`Minted Long Neck #${i} to ${to}`);
    }
};
