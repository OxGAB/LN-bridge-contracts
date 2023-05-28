import { ethers } from 'hardhat';
import { BigNumberish, utils } from 'ethers';
import {
    ERC721Mock,
    LZEndpointMock,
    LongOmnichainNeckGate,
} from '../typechain';
export function BN(n: BigNumberish) {
    return ethers.BigNumber.from(n.toString());
}
export async function resetVM() {
    await ethers.provider.send('hardhat_reset', []);
}

export async function setBalance(addr: string, ether: number) {
    await ethers.provider.send('hardhat_setBalance', [
        addr,
        utils.hexStripZeros(utils.parseEther(String(ether))._hex),
    ]);
}
async function registerLayerZeroEndpoint(chainId: number) {
    const LZEndpointMock = (await (
        await (
            await ethers.getContractFactory('LZEndpointMock')
        ).deploy(chainId)
    ).deployed()) as LZEndpointMock;

    setBalance(LZEndpointMock.address, 10);
    return LZEndpointMock;
}

async function registerErc721Mock(
    name: string,
    symbol: string,
    supply?: number,
) {
    const _supply = supply ?? 10;
    const ERC721Mock = (await (
        await (
            await ethers.getContractFactory('ERC721Mock')
        ).deploy(name, symbol)
    ).deployed()) as ERC721Mock;
    const nftOwner = ethers.Wallet.createRandom();
    for (let i = 1; i < _supply; i++)
        await (await ERC721Mock.mint(nftOwner.address, i)).wait();
    return {
        ERC721Mock,
        nftOwner,
    };
}

async function registerLNONFT(
    lzEndpointAddr: string,
    baseUri: string,
    minGas: BigNumberish,
    owner: string,
) {
    const royalitiesReceiver = ethers.Wallet.createRandom();
    const lnONFT = await (
        await (
            await ethers.getContractFactory('LongNecksONFT')
        ).deploy(
            lzEndpointAddr,
            baseUri,
            minGas,
            royalitiesReceiver.address,
            owner,
        )
    ).deployed();
    return { lnONFT, royalitiesReceiver };
}

async function registerlnGate(
    lnNFTAddr: string,
    lnONFTAddr: string,
    lzEndpointAddr: string,
    minGas: BigNumberish,
    chainIdEth: BigNumberish,
) {
    const lnGate = (await (
        await (
            await ethers.getContractFactory('LongOmnichainNeckGate')
        ).deploy(lnNFTAddr, lzEndpointAddr, minGas)
    ).deployed()) as LongOmnichainNeckGate;
    await (await lnGate.setTrustedRemoteAddress(chainIdEth, lnONFTAddr)).wait();
    return { lnGate };
}
const log = (message: string, staging?: boolean) =>
    staging && console.log(message);

export async function register(staging?: boolean) {
    if (!staging) {
        await resetVM();
    }
    /**
     * INITIAL SETUP
     */
    const deployer = (await ethers.getSigners())[0];

    log('Deploying LayerZero Endpoint Mocks', staging);
    const chainIdCanto = 7700;
    const chainIdEth = 1;
    const lzEndpointMockCanto = await registerLayerZeroEndpoint(chainIdCanto);
    const lzEndpointMockETH = await registerLayerZeroEndpoint(chainIdEth);
    const minGas = BN(100);

    log('Deploying LongNecks Canto Mock', staging);
    const { ERC721Mock: lnMock, nftOwner: _lnOwner } = await registerErc721Mock(
        'LongNecks',
        'LNFT',
    );
    setBalance(_lnOwner.address, 10);
    const lnOwner = _lnOwner.connect(
        (() => {
            if (deployer.provider === undefined)
                throw new Error('Provider is undefined');
            return deployer.provider;
        })(),
    );

    log('Deploying LongNecksONFT ETH Mock', staging);
    const { lnONFT: lnONFT, royalitiesReceiver } = await registerLNONFT(
        lzEndpointMockETH.address,
        'https://ipfs.io/ipfs/',
        minGas,
        deployer.address,
    );

    log('Deploying LongOmnichainNeckGate', staging);
    const { lnGate } = await registerlnGate(
        lnMock.address,
        lnONFT.address,
        lzEndpointMockCanto.address,
        minGas,
        chainIdEth,
    );

    await (
        await lnONFT.setTrustedRemoteAddress(chainIdCanto, lnGate.address)
    ).wait();
    await (await lnGate.setMinDstGas(chainIdEth, 1, minGas)).wait();
    await (await lnONFT.setMinDstGas(chainIdCanto, 1, minGas)).wait();

    log('Connecting LayerZero Endpoints', staging);
    await (
        await lzEndpointMockCanto.setDestLzEndpoint(
            lnONFT.address,
            lzEndpointMockETH.address,
        )
    ).wait();
    await (
        await lzEndpointMockETH.setDestLzEndpoint(
            lnGate.address,
            lzEndpointMockCanto.address,
        )
    ).wait();

    const initialSetup = {
        deployer,
        chainIdCanto,
        chainIdEth,
        lzEndpointMockCanto,
        lzEndpointMockETH,
        minGas,
        lnMock,
        lnOwner,
        lnONFT,
        royalitiesReceiver,
        lnGate,
    };
    return { ...initialSetup };
}
