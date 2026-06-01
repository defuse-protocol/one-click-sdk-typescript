/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * See [`AddPublicKey`]
 */
export type IntentAddPublicKey = {
    intent: IntentAddPublicKey.intent;
    /**
     * Encoding: base58
     */
    public_key: string;
};
export namespace IntentAddPublicKey {
    export enum intent {
        ADD_PUBLIC_KEY = 'add_public_key',
    }
}

