/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * TIP-191: The standard for message signing in Tron. For more details, refer to [TIP-191](https://github.com/tronprotocol/tips/blob/master/tip-191.md).
 */
export type MultiPayloadTip191 = {
    /**
     * See [TIP-191](https://github.com/tronprotocol/tips/blob/master/tip-191.md)
     */
    payload: string;
    /**
     * There is no public key member because the public key can be recovered via `ecrecover()` knowing the data and the signature. Encoding: base58
     */
    signature: string;
    standard: MultiPayloadTip191.standard;
};
export namespace MultiPayloadTip191 {
    export enum standard {
        TIP191 = 'tip191',
    }
}

