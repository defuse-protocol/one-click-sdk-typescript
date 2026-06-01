/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppFee } from './AppFee';
import type { Rebate } from './Rebate';
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
     *
     * `depositMode` applies only to deposit transaction metadata.
     */
    depositMode?: QuoteRequest.depositMode;
    /**
     * How to interpret `amount` (and refunds) when performing the swap:
     *
     * - `EXACT_INPUT` — requests the output amount for an exact input.
     * - If deposit is less than `amountIn`, the deposit is refunded by deadline.
     * - If deposit is above than `amountIn`, the swap is processed and the excess is refunded to `refundTo` address after swap is complete.
     *
     * - `EXACT_OUTPUT` — requests the input amount for an exact output.
     * - The output amount (`amountOut`) is fixed; slippage is applied to the **input** side.
     * - The quote response includes `amountIn` (the proposed input with slippage tolerance baked in) and `minAmountIn` (the minimum input required).
     * - **Important**: `amountIn` will appear higher than `minAmountIn` by approximately your `slippageTolerance`. This is **not** price degradation—it is a buffer to ensure successful execution. Any input amount above what is actually needed for the swap is **refunded** to your `refundTo` address after the swap completes.
     * - If the deposit is above `amountIn`, the swap is processed and the excess is refunded to `refundTo` address after swap is complete.
     * - If the deposit is less than `minAmountIn`, the deposit is refunded by deadline.
     *
     * - `FLEX_INPUT` — a flexible input amount that allows for partial deposits and variable amounts.
     * - `slippage` applies both to `amountOut` and `amountIn` and defines an acceptable range (`minAmountIn` and `minAmountOut`).
     * - Any amount higher than `minAmountIn` is accepted and converted to the output asset as long as `minAmountOut` is met.
     * - The deposit must be at least `minAmountIn`, after applying the slippage constraint to the quoted amount. Deposits below `minAmountIn` are refunded if the total received by the deadline is below this amount.
     * - If deposits exceed the upper bound, the swap is still processed
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
     * Amount to swap as the base amount. It is interpreted as the input or output amount based on the `swapType` flag and is specified in the smallest unit of the currency (e.g., wei for ETH). Must be an integer string; decimal values like "0.01" are invalid—use base units (e.g. "10000000000000000" for 0.01 with 18 decimals).
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
     * Recipient address. The format must match `recipientType`. Destination routing metadata, when required, must be encoded according to the destination chain address format.
     */
    recipient: string;
    /**
     * Addresses of connected wallets.
     */
    connectedWallets?: Array<string>;
    /**
     * Unique client session identifier for 1Click.
     */
    sessionId?: string;
    /**
     * EVM address of a transfer recipient in a virtual chain
     */
    virtualChainRecipient?: string;
    /**
     * EVM address of a refund recipient in a virtual chain
     */
    virtualChainRefundRecipient?: string;
    /**
     * **HIGHLY EXPERIMENTAL** Message to pass to `ft_transfer_call` when withdrawing assets to NEAR.
     *
     * Otherwise, `ft_transfer` will be used.
     *
     * **WARNING**: Funds will be lost if used with non NEP-141 tokens, in case of insufficient `storage_deposit` or if the recipient does not implement `ft_on_transfer` method.
     */
    customRecipientMsg?: string;
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
     * Confidentiality mode for this quote. Invite-only for now: if set, API may return an invite-only message until rollout is enabled for your integration.
     */
    confidentiality?: QuoteRequest.confidentiality;
    /**
     * Distribution channel / venue identifier (for example: ledger, trustwallet). Keep lowercase for consistency.
     */
    referral?: string;
    /**
     * Rebate distribution for this quote. Provide up to 3 confidential Intents recipients (for example, `rebate-recipient.near` on confidential Intents); each item defines a recipient and its percent share, and all shares must add up to 100.
     */
    rebates?: Array<Rebate>;
    /**
     * Time in milliseconds the user is willing to wait for a quote from the relay.
     * **Defaults to 0ms delay if not specified, if you want to receive the fastest quote.
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
     *
     * `depositMode` applies only to deposit transaction metadata.
     */
    export enum depositMode {
        SIMPLE = 'SIMPLE',
        MEMO = 'MEMO',
    }
    /**
     * How to interpret `amount` (and refunds) when performing the swap:
     *
     * - `EXACT_INPUT` — requests the output amount for an exact input.
     * - If deposit is less than `amountIn`, the deposit is refunded by deadline.
     * - If deposit is above than `amountIn`, the swap is processed and the excess is refunded to `refundTo` address after swap is complete.
     *
     * - `EXACT_OUTPUT` — requests the input amount for an exact output.
     * - The output amount (`amountOut`) is fixed; slippage is applied to the **input** side.
     * - The quote response includes `amountIn` (the proposed input with slippage tolerance baked in) and `minAmountIn` (the minimum input required).
     * - **Important**: `amountIn` will appear higher than `minAmountIn` by approximately your `slippageTolerance`. This is **not** price degradation—it is a buffer to ensure successful execution. Any input amount above what is actually needed for the swap is **refunded** to your `refundTo` address after the swap completes.
     * - If the deposit is above `amountIn`, the swap is processed and the excess is refunded to `refundTo` address after swap is complete.
     * - If the deposit is less than `minAmountIn`, the deposit is refunded by deadline.
     *
     * - `FLEX_INPUT` — a flexible input amount that allows for partial deposits and variable amounts.
     * - `slippage` applies both to `amountOut` and `amountIn` and defines an acceptable range (`minAmountIn` and `minAmountOut`).
     * - Any amount higher than `minAmountIn` is accepted and converted to the output asset as long as `minAmountOut` is met.
     * - The deposit must be at least `minAmountIn`, after applying the slippage constraint to the quoted amount. Deposits below `minAmountIn` are refunded if the total received by the deadline is below this amount.
     * - If deposits exceed the upper bound, the swap is still processed
     */
    export enum swapType {
        EXACT_INPUT = 'EXACT_INPUT',
        EXACT_OUTPUT = 'EXACT_OUTPUT',
        FLEX_INPUT = 'FLEX_INPUT',
        ANY_INPUT = 'ANY_INPUT',
    }
    /**
     * Type of deposit address:
     * - `ORIGIN_CHAIN` - deposit address on the origin chain.
     * - `INTENTS` - the account ID within NEAR Intents to which you should transfer assets.
     */
    export enum depositType {
        ORIGIN_CHAIN = 'ORIGIN_CHAIN',
        INTENTS = 'INTENTS',
        CONFIDENTIAL_INTENTS = 'CONFIDENTIAL_INTENTS',
    }
    /**
     * Type of refund address:
     * - `ORIGIN_CHAIN` - assets are refunded to the `refundTo` address on the origin chain.
     * - `INTENTS` - assets are refunded to the `refundTo` Intents account.
     */
    export enum refundType {
        ORIGIN_CHAIN = 'ORIGIN_CHAIN',
        INTENTS = 'INTENTS',
        CONFIDENTIAL_INTENTS = 'CONFIDENTIAL_INTENTS',
    }
    /**
     * Type of recipient address:
     * - `DESTINATION_CHAIN` - assets are transferred to the chain of `destinationAsset`.
     * - `INTENTS` - assets are transferred to an account inside Intents
     */
    export enum recipientType {
        DESTINATION_CHAIN = 'DESTINATION_CHAIN',
        INTENTS = 'INTENTS',
        CONFIDENTIAL_INTENTS = 'CONFIDENTIAL_INTENTS',
    }
    /**
     * Confidentiality mode for this quote. Invite-only for now: if set, API may return an invite-only message until rollout is enabled for your integration.
     */
    export enum confidentiality {
        PUBLIC = 'public',
        BASIC = 'basic',
        ADVANCED = 'advanced',
    }
}

