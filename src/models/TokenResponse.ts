/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TokenResponse = {
    /**
     * Unique asset identifier
     */
    assetId: string;
    /**
     * Number of decimals for the token
     */
    decimals: number;
    /**
     * Blockchain associated with the token
     */
    blockchain: TokenResponse.blockchain;
    /**
     * Token symbol (e.g. BTC, ETH)
     */
    symbol: string;
    /**
     * Current price of the token in USD
     */
    price: number;
    /**
     * Date when the token price was last updated
     */
    priceUpdatedAt: string;
    /**
     * Contract address of the token
     */
    contractAddress?: string;
};
export namespace TokenResponse {
    /**
     * Blockchain associated with the token
     */
    export enum blockchain {
        NEAR = 'near',
        ETH = 'eth',
        BASE = 'base',
        ARB = 'arb',
        BTC = 'btc',
        SOL = 'sol',
        TON = 'ton',
        DOGE = 'doge',
        XRP = 'xrp',
        ZEC = 'zec',
        GNOSIS = 'gnosis',
        BERA = 'bera',
        BSC = 'bsc',
        POL = 'pol',
        TRON = 'tron',
        SUI = 'sui',
    }
}

