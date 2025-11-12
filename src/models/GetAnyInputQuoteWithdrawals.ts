/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnyInputQuoteWithdrawal } from './AnyInputQuoteWithdrawal';
export type GetAnyInputQuoteWithdrawals = {
    /**
     * ID of the destination asset.
     */
    asset: string;
    /**
     * Recipient address
     */
    recipient: string;
    /**
     * Affiliate recipient address
     */
    affiliateRecipient: string;
    /**
     * Details of withdrawals
     */
    withdrawals?: AnyInputQuoteWithdrawal;
};

