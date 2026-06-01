/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MultiPayload } from './MultiPayload';
export type SubmitSwapTransferIntentRequest = {
    /**
     * The type of intent action
     */
    type: SubmitSwapTransferIntentRequest.type;
    signedData: MultiPayload;
};
export namespace SubmitSwapTransferIntentRequest {
    /**
     * The type of intent action
     */
    export enum type {
        SWAP_TRANSFER = 'swap_transfer',
    }
}

