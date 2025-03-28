/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Quote } from './Quote';
import type { QuoteRequest } from './QuoteRequest';
export type QuoteResponse = {
    /**
     * Timestamp in ISO format that took part in deposit address derivation
     */
    timestamp: string;
    /**
     * Signature that means 1click service commit to quote and deposit address
     */
    signature: string;
    /**
     * User request
     */
    quoteRequest: QuoteRequest;
    /**
     * Response that contains deposit address for user to send "amount" of **originAsset** and possible output amount
     */
    quote: Quote;
};

