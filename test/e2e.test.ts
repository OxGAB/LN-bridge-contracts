import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber, BigNumberish } from 'ethers';
import { ethers } from 'hardhat';
import { BN, register } from './test.utils';

// TODO: test on forked chain
describe('e2e tests', () => {
    it('Should bridge nft from canto to eth', async () => {
        const {
            lnMock,
            lnGate,
            lnONFT,
            lnOwner,
            minGas,
            chainIdEth,
            chainIdCanto,
            lzEndpointMockETH,
        } = await loadFixture(register);
        const tokenId = 1;
        const defaultAdapterParams = ethers.utils.solidityPack(
            ['uint16', 'uint256'],
            [1, 250000],
        );
        // estimate nativeFees
        const nativeFee = (
            await lnGate.estimateSendFee(
                chainIdEth,
                lnOwner.address,
                tokenId,
                false,
                defaultAdapterParams,
            )
        ).nativeFee;

        expect(await lnMock.ownerOf(tokenId)).to.equal(lnOwner.address);
        await lnMock.connect(lnOwner).approve(lnGate.address, tokenId);
        await expect(
            await lnGate
                .connect(lnOwner)
                .sendFrom(
                    lnOwner.address,
                    chainIdEth,
                    lnOwner.address,
                    tokenId,
                    lnOwner.address,
                    ethers.constants.AddressZero,
                    defaultAdapterParams,
                    {
                        value: nativeFee,
                    },
                ),
        ).to.emit(lnONFT, 'ReceiveFromChain');
        expect(await lnMock.ownerOf(tokenId)).to.equal(lnGate.address);
        expect(await lnONFT.totalSupply()).to.equal(1);
        expect(await lnONFT.ownerOf(tokenId)).to.equal(lnOwner.address);

        await expect(
            await lnONFT
                .connect(lnOwner)
                .sendFrom(
                    lnOwner.address,
                    chainIdCanto,
                    lnOwner.address,
                    tokenId,
                    lnOwner.address,
                    ethers.constants.AddressZero,
                    defaultAdapterParams,
                    { value: nativeFee },
                ),
        ).to.emit(lnGate, 'ReceiveFromChain');
    });
});
