/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type HistoryItem = {
    /**
     * Execution status
     */
    status: HistoryItem.status;
    /**
     * Deposit type
     */
    depositType: HistoryItem.depositType;
    /**
     * Recipient type
     */
    recipientType: HistoryItem.recipientType;
    /**
     * Creation timestamp (ISO 8601)
     */
    createdAt: string;
    /**
     * Deposit address
     */
    depositAddress: string;
    /**
     * Deposit memo
     */
    depositMemo: string | null;
    /**
     * ID of the origin asset
     */
    originAsset?: string;
    /**
     * Amount of the origin asset in readable format
     */
    amountInFormatted?: string;
    /**
     * Amount of the origin asset equivalent in USD
     */
    amountInUsd?: string;
    /**
     * ID of the destination asset
     */
    destinationAsset?: string;
    /**
     * Amount of the destination asset in readable format
     */
    amountOutFormatted?: string;
    /**
     * Amount of the destination asset equivalent in USD
     */
    amountOutUsd?: string;
    /**
     * Recipient address
     */
    recipient?: string;
    /**
     * Deposit transactions with sender and tx hash
     */
    quoteTransactions?: Array<{
        sender?: string;
        txHash?: string;
    }>;
    /**
     * Refund-to address
     */
    refundTo?: string;
    /**
     * Refund type
     */
    refundType: HistoryItem.refundType;
    /**
     * Refund reason, null when no refund occurred
     */
    refundReason?: string | null;
    /**
     * Refunded amount in readable format
     */
    refundedAmountFormatted?: string;
    /**
     * Refunded amount equivalent in USD
     */
    refundedAmountUsd?: string;
    /**
     * Refund fee in base units of the origin asset
     */
    refundFee?: string | null;
    /**
     * Formatted refund fee
     */
    refundFeeFormatted?: string;
};
export namespace HistoryItem {
    /**
     * Execution status
     */
    export enum status {
        PENDING_DEPOSIT = 'PENDING_DEPOSIT',
        INCOMPLETE_DEPOSIT = 'INCOMPLETE_DEPOSIT',
        PROCESSING = 'PROCESSING',
        SUCCESS = 'SUCCESS',
        REFUNDED = 'REFUNDED',
        FAILED = 'FAILED',
    }
    /**
     * Deposit type
     */
    export enum depositType {
        ORIGIN_CHAIN = 'ORIGIN_CHAIN',
        INTENTS = 'INTENTS',
        CONFIDENTIAL_INTENTS = 'CONFIDENTIAL_INTENTS',
    }
    /**
     * Recipient type
     */
    export enum recipientType {
        DESTINATION_CHAIN = 'DESTINATION_CHAIN',
        INTENTS = 'INTENTS',
        CONFIDENTIAL_INTENTS = 'CONFIDENTIAL_INTENTS',
    }
    /**
     * Refund type
     */
    export enum refundType {
        ORIGIN_CHAIN = 'ORIGIN_CHAIN',
        INTENTS = 'INTENTS',
        CONFIDENTIAL_INTENTS = 'CONFIDENTIAL_INTENTS',
    }
}

