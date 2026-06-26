/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetBalancesResponse } from '../models/GetBalancesResponse';
import type { HistoryResponse } from '../models/HistoryResponse';
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
    /**
     * Get transaction history
     * Returns paginated public and confidential transaction history. For the initial request, omit both nextCursor and prevCursor to retrieve the latest history. For subsequent requests, pass either nextCursor or prevCursor from the previous response.
     * @param prevCursor Pass the prevCursor value from a previous response to fetch older items. Omit both cursors for the initial request. Do not pass together with nextCursor.
     * @param nextCursor Pass the nextCursor value from a previous response to poll for newer items. Omit both cursors for the initial request. Do not pass together with prevCursor.
     * @param status Filter by statuses
     * @param limit Maximum number of items to return per page
     * @param depositAddress Filter by deposit address
     * @param depositMemo Filter by deposit memo. Only has effect when depositAddress is also provided.
     * @param search Search by deposit address, recipient, sender, or tx hash
     * @param depositType Correlated deposit type filter. Index-aligned with recipientType and refundType. Use "null" as a wildcard for that position. Multiple values form OR conditions.
     * @param recipientType Correlated recipient type filter. Index-aligned with depositType and refundType. Use "null" as a wildcard for that position.
     * @param refundType Correlated refund type filter. Index-aligned with depositType and recipientType. Use "null" as a wildcard for that position.
     * @returns HistoryResponse
     * @throws ApiError
     */
    public static getHistory(
        prevCursor?: string,
        nextCursor?: string,
        status?: Array<'PENDING_DEPOSIT' | 'INCOMPLETE_DEPOSIT' | 'PROCESSING' | 'SUCCESS' | 'REFUNDED' | 'FAILED'>,
        limit: number = 20,
        depositAddress?: string,
        depositMemo?: string,
        search?: string,
        depositType?: Array<'ORIGIN_CHAIN' | 'INTENTS' | 'CONFIDENTIAL_INTENTS' | 'null'>,
        recipientType?: Array<'DESTINATION_CHAIN' | 'INTENTS' | 'CONFIDENTIAL_INTENTS' | 'null'>,
        refundType?: Array<'ORIGIN_CHAIN' | 'INTENTS' | 'CONFIDENTIAL_INTENTS' | 'null'>,
    ): CancelablePromise<HistoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/account/history',
            query: {
                'prevCursor': prevCursor,
                'nextCursor': nextCursor,
                'status': status,
                'limit': limit,
                'depositAddress': depositAddress,
                'depositMemo': depositMemo,
                'search': search,
                'depositType': depositType,
                'recipientType': recipientType,
                'refundType': refundType,
            },
            errors: {
                401: `Unauthorized - supplied user session token is invalid or expired`,
            },
        });
    }
}
