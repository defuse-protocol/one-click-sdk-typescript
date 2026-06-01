/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Raw Ed25519: The standard used by Solana Phantom wallets for message signing. For more details, refer to [Phantom Wallet's documentation](https://docs.phantom.com/solana/signing-a-message).
 */
export type MultiPayloadRawEd25519 = {
    payload: string;
    /**
     * Encoding: base58
     */
    public_key: string;
    /**
     * Encoding: base58
     */
    signature: string;
    standard: MultiPayloadRawEd25519.standard;
};
export namespace MultiPayloadRawEd25519 {
    export enum standard {
        RAW_ED25519 = 'raw_ed25519',
    }
}

