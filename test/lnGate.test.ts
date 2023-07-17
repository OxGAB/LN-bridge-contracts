import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { register } from './test.utils';

describe('LongOmnichainNeckGate tests', () => {
    it('Should rescue token in case lz endpoint fails', async () => {
        const { lnMock, lnGate, lnOwner, chainIdEth } = await loadFixture(
            register,
        );
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
        await lnMock.connect(lnOwner).approve(lnGate.address, tokenId);
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
            );
        expect(await lnMock.ownerOf(tokenId)).to.equal(lnGate.address);
        await expect(
            await lnGate.rescueToken(tokenId, lnOwner.address),
        ).to.emit(lnGate, 'LongOmnichainNeckGate__RescuedToken');
        expect(await lnMock.ownerOf(tokenId)).to.equal(lnOwner.address);
    });
    it('Should fail if a user tries to teleport for another user', async () => {
        const { lnMock, lnGate, lnOwner, deployer, chainIdEth, lnONFT } =
            await loadFixture(register);
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
        await lnMock.connect(lnOwner).setApprovalForAll(lnGate.address, true);
        await expect(
            lnGate
                .connect(deployer)
                .sendFrom(
                    lnOwner.address,
                    chainIdEth,
                    deployer.address,
                    tokenId,
                    lnOwner.address,
                    ethers.constants.AddressZero,
                    defaultAdapterParams,
                    {
                        value: nativeFee,
                    },
                ),
        ).to.be.revertedWithCustomError(
            lnGate,
            'LongOmnichainNeckGate__NotOwner',
        );
        expect(await lnMock.ownerOf(tokenId)).to.equal(lnOwner.address);
    });
});
