/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuoteResponse } from './QuoteResponse';
import type { SwapDetails } from './SwapDetails';
export type SubmitDepositTxResponse = {
    /**
     * Quote response from original request
     */
    quoteResponse: QuoteResponse;
    status: SubmitDepositTxResponse.status;
    /**
     * Last time the state was updated
     */
    updatedAt: string;
    /**
     * Details of actual swaps and withdrawals
     */
    swapDetails: SwapDetails;
};
export namespace SubmitDepositTxResponse {
    export enum status {
        KNOWN_DEPOSIT_TX = 'KNOWN_DEPOSIT_TX',
        PENDING_DEPOSIT = 'PENDING_DEPOSIT',
        INCOMPLETE_DEPOSIT = 'INCOMPLETE_DEPOSIT',
        PROCESSING = 'PROCESSING',
        SUCCESS = 'SUCCESS',
        REFUNDED = 'REFUNDED',
        FAILED = 'FAILED',
    }
}

