/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BalanceEntry = {
    /**
     * Token identifier
     */
    tokenId: string;
    /**
     * Available balance (as string to preserve precision)
     */
    available: string;
    /**
     * Balance source
     */
    source: BalanceEntry.source;
};
export namespace BalanceEntry {
    /**
     * Balance source
     */
    export enum source {
        PRIVATE = 'private',
    }
}

