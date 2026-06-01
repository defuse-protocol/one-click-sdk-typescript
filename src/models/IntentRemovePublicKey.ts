/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * See [`RemovePublicKey`]
 */
export type IntentRemovePublicKey = {
    intent: IntentRemovePublicKey.intent;
    /**
     * Encoding: base58
     */
    public_key: string;
};
export namespace IntentRemovePublicKey {
    export enum intent {
        REMOVE_PUBLIC_KEY = 'remove_public_key',
    }
}

