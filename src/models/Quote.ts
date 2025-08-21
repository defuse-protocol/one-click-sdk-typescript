/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Quote = {
    /**
     * The deposit address on the chain of `originAsset` when `depositType` is `ORIGIN_CHAIN`.
     *
     * The deposit address inside NEAR Intents (the verifier smart contract) when `depositType` is `INTENTS`.
     */
    depositAddress?: string;
    /**
     * Some of the deposit addresses **REQUIRE** to also include the `memo` for the deposit to be processed
     */
    depositMemo?: string;
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
     * Minimum amount of the origin asset that will be used for the swap
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
     * Minimum output amount after slippage is applied
     */
    minAmountOut: string;
    /**
     * Time when the deposit address becomes inactive and funds may be lost
     */
    deadline?: string;
    /**
     * Time when the deposit address becomes cold, causing swap processing to take longer
     */
    timeWhenInactive?: string;
    /**
     * Estimated time in seconds for the swap to be executed after the deposit transaction is confirmed
     */
    timeEstimate: number;
    /**
     * EVM address of a transfer recipient in a virtual chain
     */
    virtualChainRecipient?: string;
    /**
     * EVM address of a refund recipient in a virtual chain
     */
    virtualChainRefundRecipient?: string;
};

