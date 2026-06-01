/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * [COSE ES256 (-7) algorithm](https://www.iana.org/assignments/cose/cose.xhtml#algorithms): NIST P-256 curve (a.k.a secp256r1) over SHA-256
 */
export type MultiPayloadWebauthnP256 = {
    /**
     * Base64Url-encoded [authenticatorData](https://w3c.github.io/webauthn/#authenticator-data). Encoding: base64
     */
    authenticator_data: string;
    /**
     * Serialized [clientDataJSON](https://w3c.github.io/webauthn/#dom-authenticatorresponse-clientdatajson)
     */
    client_data_json: string;
    payload: string;
    standard: MultiPayloadWebauthnP256.standard;
    /**
     * Encoding: base58
     */
    public_key: string;
    /**
     * Encoding: base58
     */
    signature: string;
};
export namespace MultiPayloadWebauthnP256 {
    export enum standard {
        WEBAUTHN = 'webauthn',
    }
}

