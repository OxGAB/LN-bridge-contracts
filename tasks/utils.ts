import { writeFileSync, existsSync, readFileSync } from 'fs';
import { ChainID, Contract, Deployment, LZ_OPTIONS } from './deploy/constants';

export const getLzOptions = (chainId: ChainID) => {
    return LZ_OPTIONS[chainId];
};
export const getLzOptionsByChainName = (chainName: string) => {
    const chainId = ChainID[chainName.toUpperCase() as keyof typeof ChainID];
    return LZ_OPTIONS[chainId];
};
export const saveToJson = (data: any, filename: string, flag: 'a' | 'w') => {
    const json = JSON.stringify(data, null, 2);
    writeFileSync(filename, json, { flag });
};

export const readFromJson = (filename: string) => {
    if (existsSync(filename)) {
        const json = readFileSync(filename, 'utf8');
        return JSON.parse(json) ?? {};
    }
    return {};
};
export const readDeployments = (): Deployment => {
    return readFromJson('deployments.json');
};

export const saveDeployment = (chainId: ChainID, contracts: Contract[]) => {
    const deployments: Deployment = {
        ...readFromJson('deployments.json'),
    };
    deployments[chainId] = [...(deployments[chainId] || []), ...contracts];

    saveToJson(deployments, 'deployments.json', 'w');
    return deployments;
};
