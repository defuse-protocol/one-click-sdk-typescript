/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StateInitV1 = {
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
    version: StateInitV1.version;
};
export namespace StateInitV1 {
    export enum version {
        V1 = 'v1',
    }
}

