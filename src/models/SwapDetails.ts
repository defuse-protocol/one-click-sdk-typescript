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
     * Exact amount of **originToken** after trade was settled
     */
    amountIn: string;
    /**
     * Exact amount of **originToken** after trade was settled in readable format
     */
    amountInFormatted: string;
    /**
     * Exact amount of **originToken** equivalent in USD
     */
    amountInUsd: string;
    /**
     * Exact amount of **destinationToken** after trade was settled
     */
    amountOut: string;
    /**
     * Exact amount of **destinationToken** in readable format
     */
    amountOutFormatted: string;
    /**
     * Exact amount of **destinationToken** equivalent in USD
     */
    amountOutUsd: string;
    /**
     * Actual slippage
     */
    slippage: number;
    /**
     * Hashes and explorer URLs for all transactions on origin chain
     */
    originChainTxHashes: Array<TransactionDetails>;
    /**
     * Hashes and explorer URLs for all transactions on destination chain
     */
    destinationChainTxHashes: Array<TransactionDetails>;
    /**
     * Amount of **originAsset** that got transferred to **refundTo**
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

