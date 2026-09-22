/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PayoutFailed = {
    status: PayoutFailed.status;
    /**
     * Terminal failure reason. This payout leg is not retried. Not populated yet - reserved for a defined set of public reasons.
     */
    reason?: string;
};
export namespace PayoutFailed {
    export enum status {
        FAILED = 'FAILED',
    }
}

