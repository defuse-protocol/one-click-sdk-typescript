/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Quote } from './Quote';
import type { QuoteRequest } from './QuoteRequest';
export type QuoteResponse = {
    /**
     * Timestamp in ISO format that took part in the deposit address derivation
     */
    timestamp: string;
    /**
     * Signature of the 1Click service confirming the quote for the specific deposit address. Must be saved on the client side (along with the whole quote) in order to resolve any disputes or mistakes.
     */
    signature: string;
    /**
     * User request
     */
    quoteRequest: QuoteRequest;
    /**
     * Response that contains the deposit address to send "amount" of <code>originAsset</code> and possible output amount.
     */
    quote: Quote;
};

