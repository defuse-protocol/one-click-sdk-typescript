/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * SEP-53: The standard for signing data off-chain for Stellar accounts. See [SEP-53](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0053.md)
 */
export type MultiPayloadSep53__Parsed = {
    payload: {
        original: string;
        parsed: {
            deadline: string;
            /**
             * Sequence of intents to execute in given order. Empty list is also a valid sequence, i.e. it doesn't do anything, but still invalidates the `nonce` for the signer WARNING: Promises created by different intents are executed concurrently and does not rely on the order of the intents in this structure
             */
            intents?: Array<({
                intent: 'add_public_key';
                /**
                 * Encoding: base58
                 */
                public_key: string;
            } | {
                intent: 'remove_public_key';
                /**
                 * Encoding: base58
                 */
                public_key: string;
            } | {
                intent: 'transfer';
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
                    version: 'v1';
                } | null;
                tokens: Record<string, string>;
            } | {
                amount: string;
                intent: 'ft_withdraw';
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
            } | {
                intent: 'nft_withdraw';
                memo?: string | null;
                /**
                 * Optional minimum required Near gas for created Promise to succeed: * `nft_transfer`:      minimum: 15TGas, default: 15TGas * `nft_transfer_call`: minimum: 30TGas, default: 50TGas
                 *
                 * Remaining gas will be distributed evenly across all Function Call Promises created during execution of current receipt.
                 */
                min_gas?: string | null;
                /**
                 * Message to pass to `nft_transfer_call`. Otherwise, `nft_transfer` will be used. NOTE: No refund will be made in case of insufficient `storage_deposit` on `token` for `receiver_id`
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
                token_id: string;
            } | {
                amounts: Array<string>;
                intent: 'mt_withdraw';
                memo?: string | null;
                /**
                 * Optional minimum required Near gas for created Promise to succeed per token: * `mt_batch_transfer`:      minimum: 20TGas, default: 20TGas * `mt_batch_transfer_call`: minimum: 35TGas, default: 50TGas
                 *
                 * Remaining gas will be distributed evenly across all Function Call Promises created during execution of current receipt.
                 */
                min_gas?: string | null;
                /**
                 * Message to pass to `mt_batch_transfer_call`. Otherwise, `mt_batch_transfer` will be used. NOTE: No refund will be made in case of insufficient `storage_deposit` on `token` for `receiver_id`
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
                token_ids: Array<string>;
            } | {
                amount: string;
                intent: 'native_withdraw';
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
            } | {
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
                intent: 'storage_deposit';
            } | {
                diff: Record<string, string>;
                intent: 'token_diff';
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
                referral?: string | null;
            } | {
                enabled: boolean;
                intent: 'set_auth_by_predecessor_id';
            } | {
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
                intent: 'auth_call';
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
                    version: 'v1';
                } | null;
            } | {
                intent: 'imt_mint';
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
                 * Receiver of the minted tokens
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
                    version: 'v1';
                } | null;
                /**
                 * The token_ids will be wrapped to bind the token ID to the minter authority (i.e. signer of this intent). The final string representation of the token will be as follows: `imt:<minter_id>:<token_id>`
                 */
                tokens: Record<string, string>;
            } | {
                intent: 'imt_burn';
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
            })>;
            /**
             * Encoding: base64
             */
            nonce: string;
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
            signer_id: string;
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
            verifying_contract: string;
        };
    };
    /**
     * Encoding: base58
     */
    public_key: string;
    /**
     * Encoding: base58
     */
    signature: string;
    standard: MultiPayloadSep53__Parsed.standard;
};
export namespace MultiPayloadSep53__Parsed {
    export enum standard {
        SEP53 = 'sep53',
    }
}

