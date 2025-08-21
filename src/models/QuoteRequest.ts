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
     * What deposit address mode you will get in the response, most chain supports only `SIMPLE` and some(for example `stellar`) only `MEMO`:
     * - `SIMPLE` - usual deposit with only deposit address.
     * - `MEMO` - some chains will **REQUIRE** the `memo` together with `depositAddress` for swap to work.
     */
    depositMode?: QuoteRequest.depositMode;
    /**
     * How to interpret `amount` when performing the swap:
     * - `EXACT_INPUT` - requests the output amount for an exact input.
     * - `EXACT_OUTPUT` - requests the input amount for an exact output. The `refundTo` address always receives any excess tokens after the swap is complete.
     * - `FLEX_INPUT` - a flexible input amount that allows for partial deposits and variable amounts.
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
     * Type of deposit address:
     * - `ORIGIN_CHAIN` - deposit address on the origin chain.
     * - `INTENTS` - the account ID within NEAR Intents to which you should transfer assets.
     */
    depositType: QuoteRequest.depositType;
    /**
     * ID of the destination asset.
     */
    destinationAsset: string;
    /**
     * Amount to swap as the base amount. It is interpreted as the input or output amount based on the `swapType` flag and is specified in the smallest unit of the currency (e.g., wei for ETH).
     */
    amount: string;
    /**
     * Address used for refunds.
     */
    refundTo: string;
    /**
     * Type of refund address:
     * - `ORIGIN_CHAIN` - assets are refunded to the `refundTo` address on the origin chain.
     * - `INTENTS` - assets are refunded to the `refundTo` Intents account.
     */
    refundType: QuoteRequest.refundType;
    /**
     * Recipient address. The format must match `recipientType`.
     */
    recipient: string;
    /**
     * EVM address of a transfer recipient in a virtual chain
     */
    virtualChainRecipient?: string;
    /**
     * EVM address of a refund recipient in a virtual chain
     */
    virtualChainRefundRecipient?: string;
    /**
     * Type of recipient address:
     * - `DESTINATION_CHAIN` - assets are transferred to the chain of `destinationAsset`.
     * - `INTENTS` - assets are transferred to an account inside Intents
     */
    recipientType: QuoteRequest.recipientType;
    /**
     * Timestamp in ISO format that identifies when the user refund begins if the swap isn't completed by then. It must exceed the time required for the deposit transaction to be mined. For example, Bitcoin may require around one hour depending on the fees paid.
     */
    deadline: string;
    /**
     * Referral identifier (lowercase only). It will be reflected in the on-chain data and displayed on public analytics platforms.
     */
    referral?: string;
    /**
     * Time in milliseconds the user is willing to wait for a quote from the relay.
     */
    quoteWaitingTimeMs?: number;
    /**
     * List of recipients and their fees
     */
    appFees?: Array<AppFee>;
};
export namespace QuoteRequest {
    /**
     * What deposit address mode you will get in the response, most chain supports only `SIMPLE` and some(for example `stellar`) only `MEMO`:
     * - `SIMPLE` - usual deposit with only deposit address.
     * - `MEMO` - some chains will **REQUIRE** the `memo` together with `depositAddress` for swap to work.
     */
    export enum depositMode {
        SIMPLE = 'SIMPLE',
        MEMO = 'MEMO',
    }
    /**
     * How to interpret `amount` when performing the swap:
     * - `EXACT_INPUT` - requests the output amount for an exact input.
     * - `EXACT_OUTPUT` - requests the input amount for an exact output. The `refundTo` address always receives any excess tokens after the swap is complete.
     * - `FLEX_INPUT` - a flexible input amount that allows for partial deposits and variable amounts.
     */
    export enum swapType {
        EXACT_INPUT = 'EXACT_INPUT',
        EXACT_OUTPUT = 'EXACT_OUTPUT',
        FLEX_INPUT = 'FLEX_INPUT',
    }
    /**
     * Type of deposit address:
     * - `ORIGIN_CHAIN` - deposit address on the origin chain.
     * - `INTENTS` - the account ID within NEAR Intents to which you should transfer assets.
     */
    export enum depositType {
        ORIGIN_CHAIN = 'ORIGIN_CHAIN',
        INTENTS = 'INTENTS',
    }
    /**
     * Type of refund address:
     * - `ORIGIN_CHAIN` - assets are refunded to the `refundTo` address on the origin chain.
     * - `INTENTS` - assets are refunded to the `refundTo` Intents account.
     */
    export enum refundType {
        ORIGIN_CHAIN = 'ORIGIN_CHAIN',
        INTENTS = 'INTENTS',
    }
    /**
     * Type of recipient address:
     * - `DESTINATION_CHAIN` - assets are transferred to the chain of `destinationAsset`.
     * - `INTENTS` - assets are transferred to an account inside Intents
     */
    export enum recipientType {
        DESTINATION_CHAIN = 'DESTINATION_CHAIN',
        INTENTS = 'INTENTS',
    }
}

