/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ChainDepositAddress = {
    /**
     * Blockchain on which this deposit address accepts funds for the quote.
     */
    blockchain: ChainDepositAddress.blockchain;
    /**
     * Deposit address on `blockchain`. Funds sent here are credited to the same Intents account.
     */
    address: string;
    /**
     * Memo required together with `address` on chains that need it (e.g. Stellar, XRP, TON).
     */
    memo?: string;
};
export namespace ChainDepositAddress {
    /**
     * Blockchain on which this deposit address accepts funds for the quote.
     */
    export enum blockchain {
        NEAR = 'near',
        ETH = 'eth',
        BASE = 'base',
        ARB = 'arb',
        BTC = 'btc',
        SOL = 'sol',
        TON = 'ton',
        DASH = 'dash',
        DOGE = 'doge',
        XRP = 'xrp',
        ZEC = 'zec',
        GNOSIS = 'gnosis',
        BERA = 'bera',
        BSC = 'bsc',
        POL = 'pol',
        TRON = 'tron',
        SUI = 'sui',
        MOVEMENT = 'movement',
        OP = 'op',
        AVAX = 'avax',
        STELLAR = 'stellar',
        APTOS = 'aptos',
        CARDANO = 'cardano',
        LTC = 'ltc',
        XLAYER = 'xlayer',
        MONAD = 'monad',
        BCH = 'bch',
        ADI = 'adi',
        PLASMA = 'plasma',
        SCROLL = 'scroll',
        STARKNET = 'starknet',
        ALEO = 'aleo',
        HYPERCORE = 'hypercore',
    }
}

