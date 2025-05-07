/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppFee = {
    /**
     * Intents Account ID where this fee will be transferred to
     */
    recipient: string;
    /**
     * Fee for this recipient as part of amountIn in basis points (1/100th of a percent), e.g. 100 for 1% fee
     */
    fee: number;
};

