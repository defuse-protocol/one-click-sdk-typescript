/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Burn a set of imt tokens, within the intents contract.
 */
export type IntentImtBurn = {
    intent: IntentImtBurn.intent;
    memo?: string | null;
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
    minter_id: string;
    /**
     * The token_ids will be wrapped to bind the token ID to the minter authority. The final string representation of the token will be as follows: `imt:<minter_id>:<token_id>`
     */
    tokens: Record<string, string>;
};
export namespace IntentImtBurn {
    export enum intent {
        IMT_BURN = 'imt_burn',
    }
}

