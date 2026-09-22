/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JsonApiError } from './JsonApiError';
import type { JsonApiMeta } from './JsonApiMeta';
export type JsonApiErrorDocument = {
    /**
     * Always populated, and never sent with data. One entry per failed field, so a request with several invalid attributes returns several errors. The codes an operation can return are listed in its description.
     */
    errors: Array<JsonApiError>;
    meta: JsonApiMeta;
};

