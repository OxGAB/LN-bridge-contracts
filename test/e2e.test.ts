import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber, BigNumberish } from 'ethers';
import { ethers } from 'hardhat';
import { BN, register } from './test.utils';

// TODO: test on forked chain
describe('e2e tests', () => {
    it('Should bridge nft from canto to eth', async () => {
        const { lnMock, lnEthVault, lnONFT, lnOwner, minGas, chainIdEth } =
            await loadFixture(register);
        const tokenId = 1;
        const gasLimit = await lnEthVault.minDstGasLookup(chainIdEth, 1);
        const defaultAdapterParams = ethers.utils.solidityPack(
            ['uint16', 'uint256'],
            [1, gasLimit],
        );
        // estimate nativeFees
        const nativeFee = (
            await lnEthVault.estimateSendFee(
                chainIdEth,
                lnOwner.address,
                tokenId,
                false,
                defaultAdapterParams,
            )
        ).nativeFee;

        expect(await lnMock.ownerOf(tokenId)).to.equal(lnOwner.address);
        await lnMock.connect(lnOwner).approve(lnEthVault.address, tokenId);
        expect(
            await lnEthVault
                .connect(lnOwner)
                .sendToEth(
                    lnOwner.address,
                    tokenId,
                    lnOwner.address,
                    ethers.constants.AddressZero,
                    defaultAdapterParams,
                    {
                        value: nativeFee,
                    },
                ),
        ).to.emit(lnEthVault, 'SendToEth');
        expect(await lnMock.ownerOf(tokenId)).to.equal(lnEthVault.address);
        expect(await lnONFT.ownerOf(tokenId)).to.equal(lnOwner.address);
    });
});
