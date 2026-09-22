/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OrderPayoutCompleted = {
    status: OrderPayoutCompleted.status;
    /**
     * Destination-chain transaction hash.
     */
    txHash: string;
};
export namespace OrderPayoutCompleted {
    export enum status {
        COMPLETED = 'COMPLETED',
    }
}

