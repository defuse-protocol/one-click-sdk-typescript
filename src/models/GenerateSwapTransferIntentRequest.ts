/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntentStandardEnum } from './IntentStandardEnum';
export type GenerateSwapTransferIntentRequest = {
    /**
     * The type of intent action
     */
    type: GenerateSwapTransferIntentRequest.type;
    /**
     * The standard used for signing the intent
     */
    standard: IntentStandardEnum;
    /**
     * The account ID of the signer
     */
    signerId: string;
    /**
     * The deposit address from the quote response
     */
    depositAddress: string;
};
export namespace GenerateSwapTransferIntentRequest {
    /**
     * The type of intent action
     */
    export enum type {
        SWAP_TRANSFER = 'swap_transfer',
    }
}

