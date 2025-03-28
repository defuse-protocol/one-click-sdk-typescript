/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Quote = {
    /**
     * Deposit address on chain of **originAsset** in case **depositType** is **ORIGIN_CHAIN**.
     * Deposit address inside near intents in case **depositType** is **INTENTS**.
     */
    depositAddress?: string;
    /**
     * Amount of origin asset
     */
    amountIn: string;
    /**
     * Amount of origin asset in readable format
     */
    amountInFormatted: string;
    /**
     * Amount of origin assets equivalent in USD
     */
    amountInUsd: string;
    /**
     * Minimum amount of origin asset that will be used for swap
     */
    minAmountIn: string;
    /**
     * Amount of destination asset
     */
    amountOut: string;
    /**
     * Amount of destination asset in readable format
     */
    amountOutFormatted: string;
    /**
     * Amount of destination asset equivalent in USD
     */
    amountOutUsd: string;
    /**
     * Minimum amount with slippage taken into account
     */
    minAmountOut: string;
    /**
     * Time when deposit address will become inactive and funds might be lost
     */
    deadline?: string;
    /**
     * Time when deposit address will become cold and swap processing will take more time
     */
    timeWhenInactive?: string;
    /**
     * Estimated time in seconds for swap to be executed after user deposit transaction is confirmed
     */
    timeEstimate?: number;
};

