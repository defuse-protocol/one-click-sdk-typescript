/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Make [NEP-145](https://nomicon.io/Standards/StorageManagement#nep-145) `storage_deposit` for an `account_id` on `contract_id`. The `amount` will be subtracted from user's NEP-141 `wNEAR` balance. NOTE: the `wNEAR` will not be refunded in any case.
 *
 * WARNING: use this intent only if paying storage_deposit is not a prerequisite for other intents to succeed. If some intent (e.g. ft_withdraw) requires storage_deposit, then use storage_deposit field of corresponding intent instead of adding a separate `StorageDeposit` intent. This is due to the fact that intents that fire `Promise`s are not guaranteed to be executed sequentially, in the order of the provided intents in `DefuseIntents`.
 */
export type StorageDeposit = {
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
    contract_id: string;
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
    deposit_for_account_id: string;
};

