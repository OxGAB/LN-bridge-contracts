import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {
    LZ_OPTIONS,
    ChainID,
    CANTO_LONG_NECKS_ADDRESS,
} from '../deploy/constants';
import { getLzOptionsByChainName, readDeployments } from '../utils';
import {
    ERC721,
    ERC721Mock,
    ERC721Mock__factory,
    ERC721__factory,
    ONFT721Core,
    ONFT721Core__factory,
} from '../../typechain';
import { constants } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
export const sendFrom__task = async (
    args: {
        dstchain: string;
        to?: string;
        tokenids?: string;
    },
    hre: HardhatRuntimeEnvironment,
) => {
    const { ethers } = hre;
    const signer = (await ethers.getSigners())[0];
    const chainName = (
        hre.network.name as string
    ).toUpperCase() as keyof typeof ChainID;
    const chainID = ChainID[chainName] as keyof typeof LZ_OPTIONS;
    const tokenIds = (args.tokenids ?? '1').split(',').map((x) => Number(x));
    const to = args.to ?? signer.address;
    const lzChainID =
        getLzOptionsByChainName(args.dstchain.toUpperCase())?.lzChainId ?? '0';
    if (lzChainID === '0') {
        throw new Error(`LayerZero Chain ID not found for ${args.dstchain}`);
    }
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
        ONFT721Core__factory.abi,
        signer,
    ) as ONFT721Core;
    if (
        chainName.toLocaleLowerCase() === 'canto' ||
        chainName.toLocaleLowerCase() === 'canto_testnet'
    )
        await approveLongNecks(
            chainName,
            contractAddress,
            tokenIds,
            signer,
            hre,
            chainID,
        );
    const defaultAdapterParams = ethers.utils.solidityPack(
        ['uint16', 'uint256'],
        [1, 250000],
    );
    if (tokenIds.length > 1) {
        const { nativeFee } = await contract.estimateSendBatchFee(
            lzChainID,
            to,
            tokenIds,
            false,
            defaultAdapterParams,
        );

        const tx = await contract.sendBatchFrom(
            signer.address,
            lzChainID,
            to,
            tokenIds,
            signer.address,
            constants.AddressZero,
            defaultAdapterParams,
            { value: nativeFee },
        );
        await tx.wait();
        console.log(
            `Sent Long Necks #${tokenIds} to ${to} on ${args.dstchain}`,
        );
    } else {
        const { nativeFee } = await contract.estimateSendFee(
            lzChainID,
            to,
            tokenIds[0],
            false,
            defaultAdapterParams,
        );

        const tx = await contract.sendFrom(
            signer.address,
            lzChainID,
            to,
            tokenIds[0],
            signer.address,
            constants.AddressZero,
            defaultAdapterParams,
            { value: nativeFee },
        );
        await tx.wait();
        console.log(
            `Sent Long Neck #${tokenIds[0]} to ${to} on ${args.dstchain}`,
        );
    }
};
async function approveLongNecks(
    chainName: string,
    address: string,
    tokenIds: number[],
    signer: SignerWithAddress,
    hre: HardhatRuntimeEnvironment,
    chainID: ChainID,
) {
    const { ethers } = hre;
    let longNecks = {} as ERC721 | ERC721Mock;
    if (chainName.toLowerCase() === 'canto_testnet') {
        const deployment = readDeployments()[chainID].find(
            (x) => x['ERC721Mock'],
        ) ?? { ERC721Mock: { address: '0x' } };
        const contractAddress: string =
            deployment['ERC721Mock'].address ?? '0x';
        if (contractAddress === '0x') {
            throw new Error('Contract address not found');
        }
        longNecks = new ethers.Contract(
            contractAddress,
            ERC721Mock__factory.abi,
            signer,
        ) as ERC721Mock;
    } else if (chainName.toLowerCase() === 'canto') {
        longNecks = new ethers.Contract(
            CANTO_LONG_NECKS_ADDRESS,
            ERC721__factory.abi,
            signer,
        ) as ERC721;
    }
    for (const tokenId of tokenIds) {
        if (!(await longNecks.isApprovedForAll(signer.address, address)))
            (await longNecks.approve(address, tokenId)).wait().then(() => {
                console.log(`Approved Long Neck #${tokenId} for ${address}`);
            });
    }
}
