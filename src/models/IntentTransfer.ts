/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * See [`Transfer`]
 */
export type IntentTransfer = {
    intent: IntentTransfer.intent;
    memo?: string | null;
    /**
     * Minimum gas for `mt_on_transfer()`
     *
     * Remaining gas will be distributed evenly across all Function Call Promises created during execution of current receipt.
     */
    min_gas?: string | null;
    /**
     * Message to pass to `mt_on_transfer`
     */
    msg?: string;
    /**
     * NEAR Account Identifier.
     *
     * This is a unique, syntactically valid, human-readable account identifier on the NEAR network.
     *
     * [See the crate-level docs for information about validation.](index.html#account-id-rules)
     *
     * Also see [Error kind precedence](AccountId#error-kind-precedence).
     *
     * ## Examples
     *
     * ``` use near_account_id::AccountId;
     *
     * let alice: AccountId = "alice.near".parse().unwrap();
     *
     * assert!("ƒelicia.near".parse::<AccountId>().is_err()); // (ƒ is not f) ```
     */
    receiver_id: string;
    /**
     * Optionally initialize the receiver's contract (Deterministic AccountId) via [`state_init`](https://github.com/near/NEPs/blob/master/neps/nep-0616.md#stateinit-action) right before calling `mt_on_transfer()` (in the same receipt).
     */
    state_init?: {
        code: ({
            hash: string;
        } | {
            /**
             * NEAR Account Identifier.
             *
             * This is a unique, syntactically valid, human-readable account identifier on the NEAR network.
             *
             * [See the crate-level docs for information about validation.](index.html#account-id-rules)
             *
             * Also see [Error kind precedence](AccountId#error-kind-precedence).
             *
             * ## Examples
             *
             * ``` use near_account_id::AccountId;
             *
             * let alice: AccountId = "alice.near".parse().unwrap();
             *
             * assert!("ƒelicia.near".parse::<AccountId>().is_err()); // (ƒ is not f) ```
             */
            account_id: string;
        });
        data: Record<string, string>;
        version: IntentTransfer.version;
    } | null;
    tokens: Record<string, string>;
};
export namespace IntentTransfer {
    export enum intent {
        TRANSFER = 'transfer',
    }
    export enum version {
        V1 = 'v1',
    }
}

