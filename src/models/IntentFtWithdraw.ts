/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * See [`FtWithdraw`]
 */
export type IntentFtWithdraw = {
    amount: string;
    intent: IntentFtWithdraw.intent;
    memo?: string | null;
    /**
     * Optional minimum required Near gas for created Promise to succeed: * `ft_transfer`:      minimum: 15TGas, default: 15TGas * `ft_transfer_call`: minimum: 30TGas, default: 50TGas
     *
     * Remaining gas will be distributed evenly across all Function Call Promises created during execution of current receipt.
     */
    min_gas?: string | null;
    /**
     * Message to pass to `ft_transfer_call`. Otherwise, `ft_transfer` will be used. NOTE: No refund will be made in case of insufficient `storage_deposit` on `token` for `receiver_id`
     */
    msg?: string | null;
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
     * Optionally make `storage_deposit` for `receiver_id` on `token`. The amount will be subtracted from user's NEP-141 `wNEAR` balance. NOTE: the `wNEAR` will not be refunded in case of fail
     */
    storage_deposit?: string | null;
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
    token: string;
};
export namespace IntentFtWithdraw {
    export enum intent {
        FT_WITHDRAW = 'ft_withdraw',
    }
}

