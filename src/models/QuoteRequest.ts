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
     * How to interpret `amount` (and refunds) when performing the swap:
     *
     * - `EXACT_INPUT` — requests the output amount for an exact input.
     * - If deposit is less than `amountIn`, the deposit is refunded by deadline.
     * - If deposit is above than `amountIn`, the swap is processed and the excess is refunded to `refundTo` address after swap is complete.
     *
     * - `EXACT_OUTPUT` — requests the input amount for an exact output.
     * - The quote response would have two fields `minAmountIn` and `maxAmountIn`.
     * - If the input is above than `maxAmountIn` the swap is processed and the excess is refunded to `refundTo` address after swap is complete.
     * - If the input is less than  `minAmountIn`, the deposit is refunded by deadline.
     *
     * - `FLEX_INPUT` — a flexible input amount that allows for partial deposits and variable amounts.
     * - `slippage` applies both to `amountOut` and `amountIn` and defines an acceptable range (`minAmountIn` and `minAmountOut`).
     * - Any amount higher than `minAmountIn` is accepted and converted to the output asset as long as `minAmountOut` is met.
     * - The `amountIn` can be less, as long as the 'slippage + 1%' constraint is met. If the total received by the deadline is below the lower bound, the deposit is refunded.
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
     * Referral identifier (lowercase only). It will be reflected in the on-chain data and displayed on public analytics platforms.
     */
    referral?: string;
    /**
     * Time in milliseconds the user is willing to wait for a quote from the relay.
     * **If you want to receive the fastest quote - use `0` as a value**
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
     * How to interpret `amount` (and refunds) when performing the swap:
     *
     * - `EXACT_INPUT` — requests the output amount for an exact input.
     * - If deposit is less than `amountIn`, the deposit is refunded by deadline.
     * - If deposit is above than `amountIn`, the swap is processed and the excess is refunded to `refundTo` address after swap is complete.
     *
     * - `EXACT_OUTPUT` — requests the input amount for an exact output.
     * - The quote response would have two fields `minAmountIn` and `maxAmountIn`.
     * - If the input is above than `maxAmountIn` the swap is processed and the excess is refunded to `refundTo` address after swap is complete.
     * - If the input is less than  `minAmountIn`, the deposit is refunded by deadline.
     *
     * - `FLEX_INPUT` — a flexible input amount that allows for partial deposits and variable amounts.
     * - `slippage` applies both to `amountOut` and `amountIn` and defines an acceptable range (`minAmountIn` and `minAmountOut`).
     * - Any amount higher than `minAmountIn` is accepted and converted to the output asset as long as `minAmountOut` is met.
     * - The `amountIn` can be less, as long as the 'slippage + 1%' constraint is met. If the total received by the deadline is below the lower bound, the deposit is refunded.
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

