/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppFee } from './AppFee';
export type QuoteRequest = {
    /**
     * Flag indicating whether this is a dry run request.
     * If `true`, the response will **NOT** contain the following fields:
     * - `depositAddress`
     * - `timeWhenInactive`
     * - `deadline`
     */
    dry: boolean;
    /**
     * Whether to use the amount as the output or the input for the basis of the swap:
     * - `EXACT_INPUT` - request output amount for exact input.
     * - `EXACT_OUTPUT` - request output amount for exact output. The `refundTo` address will always receive excess tokens back even after the swap is complete.
     */
    swapType: QuoteRequest.swapType;
    /**
     * Slippage tolerance for the swap. This value is in basis points (1/100th of a percent), e.g. 100 for 1% slippage.
     */
    slippageTolerance: number;
    /**
     * ID of the origin asset.
     */
    originAsset: string;
    /**
     * Type of the deposit address:
     * - `ORIGIN_CHAIN` - deposit address on the origin chain
     * - `INTENTS` - **account ID** inside near intents to which you should transfer assets inside intents.
     */
    depositType: QuoteRequest.depositType;
    /**
     * ID of the destination asset.
     */
    destinationAsset: string;
    /**
     * Amount to swap as the base amount (can be switched to exact input/output using the dedicated flag), denoted in the smallest unit of the specified currency (e.g., wei for ETH).
     */
    amount: string;
    /**
     * Address for user refund.
     */
    refundTo: string;
    /**
     * Type of refund address:
     * - `ORIGIN_CHAIN` - assets will be refunded to `refundTo` address on the origin chain
     * - `INTENTS` - assets will be refunded to `refundTo` intents account
     */
    refundType: QuoteRequest.refundType;
    /**
     * Recipient address. The format should match `recipientType`.
     */
    recipient: string;
    /**
     * Type of recipient address:
     * - `DESTINATION_CHAIN` - assets will be transferred to chain of `destinationAsset`
     * - `INTENTS` - assets will be transferred to account inside intents
     */
    recipientType: QuoteRequest.recipientType;
    /**
     * Timestamp in ISO format, that identifies when user refund will begin if the swap isn't completed by then.
     */
    deadline: string;
    /**
     * Referral identifier(lower case only)
     */
    referral?: string;
    /**
     * Time in milliseconds user is willing to wait for quote from relay.
     */
    quoteWaitingTimeMs?: number;
    /**
     * List of recipients and their fees
     */
    appFees?: Array<AppFee>;
};
export namespace QuoteRequest {
    /**
     * Whether to use the amount as the output or the input for the basis of the swap:
     * - `EXACT_INPUT` - request output amount for exact input.
     * - `EXACT_OUTPUT` - request output amount for exact output. The `refundTo` address will always receive excess tokens back even after the swap is complete.
     */
    export enum swapType {
        EXACT_INPUT = 'EXACT_INPUT',
        EXACT_OUTPUT = 'EXACT_OUTPUT',
    }
    /**
     * Type of the deposit address:
     * - `ORIGIN_CHAIN` - deposit address on the origin chain
     * - `INTENTS` - **account ID** inside near intents to which you should transfer assets inside intents.
     */
    export enum depositType {
        ORIGIN_CHAIN = 'ORIGIN_CHAIN',
        INTENTS = 'INTENTS',
    }
    /**
     * Type of refund address:
     * - `ORIGIN_CHAIN` - assets will be refunded to `refundTo` address on the origin chain
     * - `INTENTS` - assets will be refunded to `refundTo` intents account
     */
    export enum refundType {
        ORIGIN_CHAIN = 'ORIGIN_CHAIN',
        INTENTS = 'INTENTS',
    }
    /**
     * Type of recipient address:
     * - `DESTINATION_CHAIN` - assets will be transferred to chain of `destinationAsset`
     * - `INTENTS` - assets will be transferred to account inside intents
     */
    export enum recipientType {
        DESTINATION_CHAIN = 'DESTINATION_CHAIN',
        INTENTS = 'INTENTS',
    }
}

