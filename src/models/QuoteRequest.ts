/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QuoteRequest = {
    /**
     *
     * Flag indicating whether this is a dry run request.
     *
     * If **true**, the response will **NOT** contain the following fields:
     *
     * **depositAddress**
     *
     * **timeWhenInactive**
     *
     * **timeEstimate**
     *
     * **deadline**
     *
     */
    dry: boolean;
    /**
     * Whether to use the amount as the output or the input for the basis of the swap.
     *
     * EXACT_OUTPUT: the **refundTo** address will always receive excess tokens back even after the swap is complete.
     *
     */
    swapType: QuoteRequest.swapType;
    /**
     * Slippage tolerance for the swap. This value is in basis points (1/100th of a percent), e.g. 100 for 1% slippage.
     */
    slippageTolerance: number;
    /**
     * ID of origin asset
     */
    originAsset: string;
    /**
     * Type of deposit address
     *
     * ORIGIN_CHAIN - deposit address on origin chain
     *
     * INTENTS - **accountId** inside near intents to which you should transfer assets inside intents.
     */
    depositType: QuoteRequest.depositType;
    /**
     * ID of destination asset
     */
    destinationAsset: string;
    /**
     * Amount to swap as the base amount (can be switched to exact input/output using the dedicated flag), denoted in the smallest unit of the specified currency (e.g., wei for ETH)
     */
    amount: string;
    /**
     * Address for user refund
     */
    refundTo: string;
    /**
     * Type of refund address
     *
     * ORIGIN_CHAIN - assets will be refunded to **refundTo** address on origin chain
     *
     * INTENTS - assets will be refunded to **refundTo** intents account
     */
    refundType: QuoteRequest.refundType;
    /**
     * Recipient address, format should match **recipientType**
     */
    recipient: string;
    /**
     * Type of recipient address
     *
     * DESTINATION_CHAIN - assets will be transferred to chain of **destinationAsset**
     *
     * INTENTS - assets will be transferred to account inside intents
     */
    recipientType: QuoteRequest.recipientType;
    /**
     * Timestamp in ISO format, that identifies when user refund will begin if swap was`t completed by then
     */
    deadline: string;
    /**
     * Referral identifier
     */
    referral?: string;
    /**
     * Time in milliseconds user is willing to wait for quote from relay
     */
    quoteWaitingTimeMs?: number;
};
export namespace QuoteRequest {
    /**
     * Whether to use the amount as the output or the input for the basis of the swap.
     *
     * EXACT_OUTPUT: the **refundTo** address will always receive excess tokens back even after the swap is complete.
     *
     */
    export enum swapType {
        EXACT_INPUT = 'EXACT_INPUT',
        EXACT_OUTPUT = 'EXACT_OUTPUT',
    }
    /**
     * Type of deposit address
     *
     * ORIGIN_CHAIN - deposit address on origin chain
     *
     * INTENTS - **accountId** inside near intents to which you should transfer assets inside intents.
     */
    export enum depositType {
        ORIGIN_CHAIN = 'ORIGIN_CHAIN',
        INTENTS = 'INTENTS',
    }
    /**
     * Type of refund address
     *
     * ORIGIN_CHAIN - assets will be refunded to **refundTo** address on origin chain
     *
     * INTENTS - assets will be refunded to **refundTo** intents account
     */
    export enum refundType {
        ORIGIN_CHAIN = 'ORIGIN_CHAIN',
        INTENTS = 'INTENTS',
    }
    /**
     * Type of recipient address
     *
     * DESTINATION_CHAIN - assets will be transferred to chain of **destinationAsset**
     *
     * INTENTS - assets will be transferred to account inside intents
     */
    export enum recipientType {
        DESTINATION_CHAIN = 'DESTINATION_CHAIN',
        INTENTS = 'INTENTS',
    }
}

