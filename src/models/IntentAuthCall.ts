/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * See [`AuthCall`]
 */
export type IntentAuthCall = {
    /**
     * Optionally, attach deposit to [`.on_auth`](::defuse_auth_call::AuthCallee::on_auth) call. The amount will be subtracted from user's NEP-141 `wNEAR` balance.
     *
     * NOTE: the `wNEAR` will not be refunded in case of fail.
     */
    attached_deposit?: string;
    /**
     * Callee for [`.on_auth`](::defuse_auth_call::AuthCallee::on_auth)
     */
    contract_id: string;
    intent: IntentAuthCall.intent;
    /**
     * Optional minimum gas required for created promise to succeed. By default, only [`MIN_GAS_DEFAULT`](AuthCall::MIN_GAS_DEFAULT) is required.
     *
     * Remaining gas will be distributed evenly across all Function Call Promises created during execution of current receipt.
     */
    min_gas?: string | null;
    /**
     * `msg` to pass in [`.on_auth`](::defuse_auth_call::AuthCallee::on_auth)
     */
    msg: string;
    /**
     * Optionally initialize the receiver's contract (Deterministic AccountId) via [`state_init`](https://github.com/near/NEPs/blob/master/neps/nep-0616.md#stateinit-action) right before calling [`.on_auth()`](::defuse_auth_call::AuthCallee::on_auth) (in the same receipt).
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
        version: IntentAuthCall.version;
    } | null;
};
export namespace IntentAuthCall {
    export enum intent {
        AUTH_CALL = 'auth_call',
    }
    export enum version {
        V1 = 'v1',
    }
}

