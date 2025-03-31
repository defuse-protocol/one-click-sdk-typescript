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
     * Get supported tokens
     * <p>Retrieves a list of tokens currently supported by the 1Click API for asset swaps.</p>
     * <p>Each token entry includes its blockchain, contract address (if available), price in USD, and other metadata such as symbol and decimals.</p>
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
     * Request a swap quote
     * <p>Generates a swap quote based on input parameters such as the assets, amount, slippage tolerance, and recipient/refund information.</p>
     * <p>Returns pricing details, estimated time, and a unique <strong>deposit address</strong> to which tokens must be transferred to initiate the swap.</p>
     * <p>You can set the <code>dry</code> parameter to <code>true</code> to simulate the quote request <strong>without generating a deposit address</strong> or initiating the swap process. This is useful for previewing swap parameters or validating input data without committing to an actual swap.</p>
     * <p>This endpoint is the first required step in the swap process.</p>
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
     * Check swap execution status
     * <p>Retrieves the current status of a swap using the unique deposit address from the quote.</p>
     * <p>The response includes the state of the swap (e.g., pending, processing, success, refunded) and any associated swap and transaction details.</p>
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
     * Submit deposit transaction hash
     * <p>Optionally notifies the 1Click service that a deposit has been sent to the specified address, using the blockchain transaction hash.</p>
     * <p>This step can speed up swap processing by allowing the system to preemptively verify the deposit.</p>
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
