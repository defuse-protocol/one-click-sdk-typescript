/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * See [`StorageDeposit`]
 */
export type IntentStorageDeposit = {
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
    intent: IntentStorageDeposit.intent;
};
export namespace IntentStorageDeposit {
    export enum intent {
        STORAGE_DEPOSIT = 'storage_deposit',
    }
}

