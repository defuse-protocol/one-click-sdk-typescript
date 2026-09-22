/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JsonApiErrorSource } from './JsonApiErrorSource';
export type JsonApiError = {
    /**
     * HTTP status code as a string, per JSON:API.
     */
    status: string;
    /**
     * Stable machine-readable identifier. Branch on this, never on title or detail. New codes arrive without a major version, so treat an unrecognized code as the HTTP status alone. Each response documents the codes it can carry; this type is shared by every endpoint and so cannot list them.
     */
    code: string;
    /**
     * Short human-readable summary.
     */
    title: string;
    /**
     * Human-readable explanation of this occurrence.
     */
    detail?: string;
    source?: JsonApiErrorSource;
};

