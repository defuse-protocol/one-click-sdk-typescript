/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetExecutionStatusResponse } from '../models/GetExecutionStatusResponse';
import type { QuoteRequest } from '../models/QuoteRequest';
import type { QuoteResponse } from '../models/QuoteResponse';
import type { SubmitDepositTxRequest } from '../models/SubmitDepositTxRequest';
import type { SubmitDepositTxResponse } from '../models/SubmitDepositTxResponse';
import type { TokenResponse } from '../models/TokenResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OneClickService {
    /**
     * Returns tokens that can be swapped
     * @returns TokenResponse
     * @throws ApiError
     */
    public static getTokens(): CancelablePromise<Array<TokenResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/tokens',
        });
    }
    /**
     * Returns the best quote with deposit address
     * @param requestBody
     * @returns QuoteResponse
     * @throws ApiError
     */
    public static getQuote(
        requestBody: QuoteRequest,
    ): CancelablePromise<QuoteResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v0/quote',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid input data`,
            },
        });
    }
    /**
     * Returns execution status for a given deposit address
     * @param depositAddress
     * @returns GetExecutionStatusResponse
     * @throws ApiError
     */
    public static getExecutionStatus(
        depositAddress: string,
    ): CancelablePromise<GetExecutionStatusResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/status',
            query: {
                'depositAddress': depositAddress,
            },
            errors: {
                404: `Deposit address not found`,
            },
        });
    }
    /**
     * Submit a deposit transaction
     * @param requestBody
     * @returns SubmitDepositTxResponse
     * @throws ApiError
     */
    public static submitDepositTx(
        requestBody: SubmitDepositTxRequest,
    ): CancelablePromise<SubmitDepositTxResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v0/deposit/submit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid input data`,
            },
        });
    }
}
