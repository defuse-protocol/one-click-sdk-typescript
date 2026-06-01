/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * NEP-413: The standard for message signing in Near Protocol. For more details, refer to [NEP-413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md).
 */
export type MultiPayloadNep413 = {
    /**
     * See [NEP-413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md)
     */
    payload: {
        callbackUrl?: string | null;
        message: string;
        /**
         * Encoding: base64
         */
        nonce: string;
        recipient: string;
    };
    /**
     * Encoding: base58
     */
    public_key: string;
    /**
     * Encoding: base58
     */
    signature: string;
    standard: MultiPayloadNep413.standard;
};
export namespace MultiPayloadNep413 {
    export enum standard {
        NEP413 = 'nep413',
    }
}

