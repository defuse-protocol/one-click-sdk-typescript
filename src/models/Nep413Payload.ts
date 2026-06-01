/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * See [NEP-413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md)
 */
export type Nep413Payload = {
    callbackUrl?: string | null;
    message: string;
    /**
     * Encoding: base64
     */
    nonce: string;
    recipient: string;
};

