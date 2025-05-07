/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Quote = {
    /**
     * The deposit address on the chain of `originAsset` in case if `depositType` is `ORIGIN_CHAIN`.
     *
     * The deposit address inside of near intents (the verifier smart contract) in case if `depositType` is `INTENTS`.
     */
    depositAddress?: string;
    /**
     * Amount of the origin asset
     */
    amountIn: string;
    /**
     * Amount of the origin asset in readable format
     */
    amountInFormatted: string;
    /**
     * Amount of the origin assets equivalent in USD
     */
    amountInUsd: string;
    /**
     * Minimum amount of the origin asset that will be used for swap
     */
    minAmountIn: string;
    /**
     * Amount of the destination asset
     */
    amountOut: string;
    /**
     * Amount of the destination asset in readable format
     */
    amountOutFormatted: string;
    /**
     * Amount of the destination asset equivalent in USD
     */
    amountOutUsd: string;
    /**
     * Minimum amount with slippage taken into account
     */
    minAmountOut: string;
    /**
     * Time when the deposit address will become inactive and funds might be lost
     */
    deadline?: string;
    /**
     * Time when the deposit address will become cold and swap processing will take more time
     */
    timeWhenInactive?: string;
    /**
     * Estimated time in seconds for swap to be executed after the deposit transaction is confirmed
     */
    timeEstimate?: number;
};

