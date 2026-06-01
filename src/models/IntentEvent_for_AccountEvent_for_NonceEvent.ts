/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type IntentEvent_for_AccountEvent_for_NonceEvent = {
    /**
     * Account identifier. This is the human readable UTF-8 string which is used internally to index accounts on the network and their respective state.
     *
     * This is the "referenced" version of the account ID. It is to [`AccountId`] what [`str`] is to [`String`], and works quite similarly to [`Path`]. Like with [`str`] and [`Path`], you can't have a value of type `AccountIdRef`, but you can have a reference like `&AccountIdRef` or `&mut AccountIdRef`.
     *
     * This type supports zero-copy deserialization offered by [`serde`](https://docs.rs/serde/), but cannot do the same for [`borsh`](https://docs.rs/borsh/) since the latter does not support zero-copy.
     *
     * # Examples ``` use near_account_id::{AccountId, AccountIdRef}; use std::convert::{TryFrom, TryInto};
     *
     * // Construction let alice = AccountIdRef::new("alice.near").unwrap(); assert!(AccountIdRef::new("invalid.").is_err()); ```
     *
     * [`FromStr`]: std::str::FromStr [`Path`]: std::path::Path
     */
    account_id: string;
    /**
     * Encoding: base58
     */
    intent_hash: string;
    /**
     * Encoding: base64
     */
    nonce: string;
};

