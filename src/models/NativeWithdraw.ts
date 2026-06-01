/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Withdraw native tokens (NEAR) from the intents contract to a given external account id (external being outside of intents). This will subtract from the account's wNEAR balance, and will be sent to the account specified as native NEAR. NOTE: the `wNEAR` will not be refunded in case of fail (e.g. `receiver_id` account does not exist).
 */
export type NativeWithdraw = {
    amount: string;
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
};

