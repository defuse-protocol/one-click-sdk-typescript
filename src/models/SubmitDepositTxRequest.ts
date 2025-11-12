/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubmitDepositTxRequest = {
    /**
     * Transaction hash of your deposit
     */
    txHash: string;
    /**
     * Deposit address for the quote
     */
    depositAddress: string;
    /**
     * Sender account (used only for NEAR blockchain)
     */
    nearSenderAccount?: string;
    /**
     * Memo (use if deposit was submitted with one)
     */
    memo?: string;
};

