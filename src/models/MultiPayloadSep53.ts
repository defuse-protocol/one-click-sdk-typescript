/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * SEP-53: The standard for signing data off-chain for Stellar accounts. See [SEP-53](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0053.md)
 */
export type MultiPayloadSep53 = {
    payload: string;
    /**
     * Encoding: base58
     */
    public_key: string;
    /**
     * Encoding: base58
     */
    signature: string;
    standard: MultiPayloadSep53.standard;
};
export namespace MultiPayloadSep53 {
    export enum standard {
        SEP53 = 'sep53',
    }
}

