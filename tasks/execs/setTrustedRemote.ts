import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {
    CANTO_LONG_NECKS_ADDRESS,
    LZ_OPTIONS,
    ChainID,
    LONG_NECKS_BASE_URI,
} from '../deploy/constants';
import { readDeployments, saveDeployment } from '../utils';
import inquirer from 'inquirer';
import { LzApp, LzApp__factory } from '../../typechain';
export const setTrustedRemotes__task = async (
    args: {
        remotes: string;
    },
    hre: HardhatRuntimeEnvironment,
) => {
    const { ethers } = hre;
    const signer = (await ethers.getSigners())[0];
    const chainName = (
        hre.network.name as string
    ).toUpperCase() as keyof typeof ChainID;
    const chainID = ChainID[chainName] as keyof typeof LZ_OPTIONS;
    const remotes = args.remotes.split(',').reduce((acc, x) => {
        const [chainID, addressesRaw] = x.split(':');
        const addresses = addressesRaw.split('_');
        acc[chainID] = addresses;
        return acc;
    }, {} as Record<string, string[]>);
    const chainIDs = Object.keys(remotes);
    const iterations = chainIDs
        .map((x) => remotes[x].length)
        .reduce((a, b) => a + b);
    console.log(
        `Setting ${chainIDs.length} trusted remotes for ${chainName}...`,
    );
    const deployment = readDeployments()[chainID].find(
        (x) => x['LongNecksONFT'] || x['LongNecksGate'],
    ) ?? { ERC721Mock: { address: '' } };
    const contractAddress: string =
    (
            // @ts-ignore
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
    for (let i = 0; i < chainIDs.length; i++) {
        const _chainId = chainIDs[i];
        const addresses = remotes[_chainId];
        for (let j = 0; j < addresses.length; j++) {
            const address = addresses[j];
            const tx = await contract.setTrustedRemote(_chainId, address);
            await tx.wait();
            console.log(
                `Set trusted remote ${j + 1}/${iterations} for ${chainName}`,
            );
            console.log(`tx: ${tx.hash}`);
        }
    }
};
