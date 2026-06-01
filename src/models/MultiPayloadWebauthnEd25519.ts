/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * [COSE EdDSA (-8) algorithm](https://www.iana.org/assignments/cose/cose.xhtml#algorithms): ed25519 curve
 */
export type MultiPayloadWebauthnEd25519 = {
    /**
     * Base64Url-encoded [authenticatorData](https://w3c.github.io/webauthn/#authenticator-data). Encoding: base64
     */
    authenticator_data: string;
    /**
     * Serialized [clientDataJSON](https://w3c.github.io/webauthn/#dom-authenticatorresponse-clientdatajson)
     */
    client_data_json: string;
    payload: string;
    standard: MultiPayloadWebauthnEd25519.standard;
    /**
     * Encoding: base58
     */
    public_key: string;
    /**
     * Encoding: base58
     */
    signature: string;
};
export namespace MultiPayloadWebauthnEd25519 {
    export enum standard {
        WEBAUTHN = 'webauthn',
    }
}

