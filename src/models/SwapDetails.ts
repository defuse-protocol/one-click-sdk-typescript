/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TransactionDetails } from './TransactionDetails';
export type SwapDetails = {
    /**
     * All intent hashes that took part in this swap
     */
    intentHashes: Array<string>;
    /**
     * All Near transactions executed for this swap
     */
    nearTxHashes: Array<string>;
    /**
     * Exact amount of <code>originToken</code> after trade was settled
     */
    amountIn?: string;
    /**
     * Exact amount of <code>originToken</code> after trade was settled in readable format
     */
    amountInFormatted?: string;
    /**
     * Exact amount of <code>originToken</code> equivalent in USD
     */
    amountInUsd?: string;
    /**
     * Exact amount of <code>destinationToken</code> after trade was settled
     */
    amountOut?: string;
    /**
     * Exact amount of <code>destinationToken</code> in readable format
     */
    amountOutFormatted?: string;
    /**
     * Exact amount of <code>destinationToken</code> equivalent in USD
     */
    amountOutUsd?: string;
    /**
     * Actual slippage
     */
    slippage?: number;
    /**
     * Hashes and explorer URLs for all transactions on the origin chain
     */
    originChainTxHashes: Array<TransactionDetails>;
    /**
     * Hashes and explorer URLs for all transactions on the destination chain
     */
    destinationChainTxHashes: Array<TransactionDetails>;
    /**
     * Amount of <code>originAsset</code> that got transferred to <code>refundTo</code>
     */
    refundedAmount?: string;
    /**
     * Refunded amount in readable format
     */
    refundedAmountFormatted?: string;
    /**
     * Refunded amount equivalent in USD
     */
    refundedAmountUsd?: string;
};

