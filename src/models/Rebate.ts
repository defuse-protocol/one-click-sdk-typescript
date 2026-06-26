/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Rebate = {
    /**
     * Confidential Intents account identifier that receives this rebate share. Rebate delivery uses signed transfer intent on Confidential Intents; direct token transfers are not supported.
     */
    recipient: string;
    /**
     * Rebate share for this recipient in percent.
     */
    share: number;
};

