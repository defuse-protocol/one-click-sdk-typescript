/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AnyInputQuoteWithdrawal = {
    /**
     * Withdrawal status
     */
    status: AnyInputQuoteWithdrawal.status;
    /**
     * Amount out in readable format
     */
    amountOutFormatted: string;
    /**
     * Amount out in USD
     */
    amountOutUsd: string;
    /**
     * Amount out in smallest unit
     */
    amountOut: string;
    /**
     * Withdrawal fee in readable format
     */
    withdrawFeeFormatted: string;
    /**
     * Withdrawal fee in smallest unit
     */
    withdrawFee: string;
    /**
     * Withdrawal fee in USD
     */
    withdrawFeeUsd: string;
    /**
     * Timestamp of withdrawal
     */
    timestamp: string;
    /**
     * Transaction hash
     */
    hash: string;
};
export namespace AnyInputQuoteWithdrawal {
    /**
     * Withdrawal status
     */
    export enum status {
        SUCCESS = 'SUCCESS',
        FAILED = 'FAILED',
    }
}

