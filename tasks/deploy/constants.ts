import {
    LongNecksONFT__factory,
    LongOmnichainNeckGate__factory,
} from '../../typechain';

export enum ChainID {
    // Mainnets
    MAINNET = '1',
    BSC = '56',
    AVALANCHE = '43114',
    POLYGON = '137',
    FANTOM = '250',
    ARBITRUM = '42161',
    OPTIMISM = '10',
    HARMONY = '1666600000',
    CANTO = '7700',

    // Testnets
    GOERLI = '5',
    BSC_TESTNET = '97',
    FUJI_AVALANCHE = '43113',
    MUMBAI_POLYGON = '80001',
    FANTOM_TESTNET = '4002',
    ARBITRUM_GOERLI = '421613',
    OPTIMISM_GOERLI = '420',
    HARMONY_TESTNET = '1666700000',
    CANTO_TESTNET = '7701',
}
export const LZ_OPTIONS: {
    [key in ChainID]?: {
        lzChainId: string;
        lzEndpointAddr: string;
        minGas: string;
    };
} = {
    // Mainnet
    [ChainID.MAINNET]: {
        lzChainId: '101',
        lzEndpointAddr: '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675',
        minGas: '0',
    },
    [ChainID.CANTO]: {
        lzChainId: '159',
        lzEndpointAddr: '0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4',
        minGas: '0',
    },
    // Testnet
    [ChainID.GOERLI]: {
        lzChainId: '10121',
        lzEndpointAddr: '0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23',
        minGas: '0',
    },
    [ChainID.CANTO_TESTNET]: {
        lzChainId: '10159',
        lzEndpointAddr: '0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1',
        minGas: '0',
    },
};
export const CANTO_LONG_NECKS_ADDRESS =
    '0xC0C73CcFEE66eb400acCee23Fe70369186e4D3C9';
export const LONG_NECKS_ROYALITY_RECEPIENT_ADDRESS =
    '0x745169C52E6185736393B1CbEfE9D96DFeEB0485';
export const LONG_NECKS_BASE_URI = 'ipfs://longnecks.art/api/';
export const LONG_NECKS_OWNER_ADDRESS =
    '0x745169C52E6185736393B1CbEfE9D96DFeEB0485';
export type Contract = {
    [name: string]: {
        address: string;
        deploymentTxHash: string;
        constructorArgs:
            | Parameters<LongOmnichainNeckGate__factory['deploy']>
            | Parameters<LongNecksONFT__factory['deploy']>;
    };
};
export type Deployment = {
    [chainId in ChainID]: Contract[];
};
