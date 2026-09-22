/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LimitOrderPartialFill = {
    /**
     * Public identifier for this fill attempt.
     */
    id: string;
    /**
     * Gross input allocated to the fill, in input-asset smallest units.
     */
    amountIn: string;
    /**
     * Net output received for the fill, in output-asset smallest units.
     */
    amountOut: string;
    /**
     * ISO 8601 creation timestamp.
     */
    createdAt: string;
    /**
     * ISO 8601 last-update timestamp.
     */
    updatedAt: string;
};

