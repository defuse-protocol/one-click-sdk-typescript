/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetBalancesResponse } from '../models/GetBalancesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountService {
    /**
     * Get user token balances
     * Returns token balances for the authenticated user from private balance sources
     * @param tokenIds Comma-separated list of token IDs to query. If empty, returns all non-zero balances.
     * @returns GetBalancesResponse
     * @throws ApiError
     */
    public static getBalances(
        tokenIds?: Array<string>,
    ): CancelablePromise<GetBalancesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/account/balances',
            query: {
                'tokenIds': tokenIds,
            },
            errors: {
                401: `Unauthorized - User session token is invalid or expired`,
            },
        });
    }
}
