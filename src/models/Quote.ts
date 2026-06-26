/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChainDepositAddress } from './ChainDepositAddress';
export type Quote = {
    /**
     * The deposit address on the chain of `originAsset` when `depositType` is `ORIGIN_CHAIN`.
     *
     * The deposit address inside NEAR Intents (the verifier smart contract) when `depositType` is `INTENTS`.
     *
     * The account ID within Confidential Intents to which assets are to be transferred when `depositType` is `CONFIDENTIAL_INTENTS`. Fund the swap by submitting a signed transfer intent to this value. Direct token transfers are not supported.
     */
    depositAddress?: string;
    /**
     * Some deposit addresses **REQUIRE** a `memo` together with `depositAddress` for the deposit to be processed. This field is deposit-side metadata.
     */
    depositMemo?: string;
    /**
     * Deposit addresses across all bridge-supported blockchains for funding the same Intents account. Present only for public `ANY_INPUT` quotes (`depositType` `INTENTS`); the confidential rail does not support multi-chain funding addresses yet. Each entry forwards to the Intents account in `depositAddress`, so the user may deposit from any listed chain.
     */
    chainDepositAddresses?: Array<ChainDepositAddress>;
    /**
     * Amount of the origin asset
     */
    amountIn: string;
    /**
     * Amount of the origin asset in readable format
     */
    amountInFormatted: string;
    /**
     * Amount of the origin assets equivalent in USD
     */
    amountInUsd: string;
    /**
     * Minimum amount of the origin asset that will be used for the swap
     */
    minAmountIn: string;
    /**
     * Amount of the destination asset
     */
    amountOut: string;
    /**
     * Amount of the destination asset in readable format
     */
    amountOutFormatted: string;
    /**
     * Amount of the destination asset equivalent in USD
     */
    amountOutUsd: string;
    /**
     * Minimum output amount after slippage is applied
     */
    minAmountOut: string;
    /**
     * Time when the deposit address becomes inactive and funds may be lost
     */
    deadline?: string;
    /**
     * Time when the deposit address becomes cold, causing swap processing to take longer
     */
    timeWhenInactive?: string;
    /**
     * Estimated time in seconds for the swap to be executed after the deposit transaction is confirmed
     */
    timeEstimate: number;
    /**
     * EVM address of a transfer recipient in a virtual chain
     */
    virtualChainRecipient?: string;
    /**
     * EVM address of a refund recipient in a virtual chain
     */
    virtualChainRefundRecipient?: string;
    /**
     * **HIGHLY EXPERIMENTAL** Message passed to `ft_transfer_call` when withdrawing assets to NEAR.
     *
     * Otherwise, `ft_transfer` will be used.
     *
     * **WARNING**: Funds will be lost if used with non NEP-141 tokens, in case of insufficient `storage_deposit` or if the recipient does not implement `ft_on_transfer` method.
     */
    customRecipientMsg?: string;
    /**
     * Fee charged for refunding assets to the refund address in the smallest unit of the origin asset
     */
    refundFee?: string;
    /**
     * Fee charged for withdrawing assets to the recipient in the smallest unit of the destination asset. This fee is already accounted for in the final amountOut result
     */
    withdrawFee?: string;
};

