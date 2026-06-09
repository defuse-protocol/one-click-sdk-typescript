/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenerateIntentResponse } from '../models/GenerateIntentResponse';
import type { GenerateSwapTransferIntentRequest } from '../models/GenerateSwapTransferIntentRequest';
import type { GetAnyInputQuoteWithdrawals } from '../models/GetAnyInputQuoteWithdrawals';
import type { GetExecutionStatusResponse } from '../models/GetExecutionStatusResponse';
import type { QuoteRequest } from '../models/QuoteRequest';
import type { QuoteResponse } from '../models/QuoteResponse';
import type { SubmitDepositTxRequest } from '../models/SubmitDepositTxRequest';
import type { SubmitDepositTxResponse } from '../models/SubmitDepositTxResponse';
import type { SubmitIntentResponse } from '../models/SubmitIntentResponse';
import type { SubmitSwapTransferIntentRequest } from '../models/SubmitSwapTransferIntentRequest';
import type { TokenResponse } from '../models/TokenResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OneClickService {
    /**
     * Get supported tokens
     * Retrieves a list of tokens currently supported by the 1Click API for asset swaps.
     *
     * Each token entry includes its blockchain, contract address (if available), price in USD, and other metadata such as symbol and decimals.
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
     * Generates a swap quote based on input parameters such as the assets, amount, slippage tolerance, and recipient/refund information.
     *
     * Returns pricing details, estimated time, and a unique **deposit address** to which tokens must be transferred to initiate the swap.
     *
     * You can set the `dry` parameter to `true` to simulate the quote request **without generating a deposit address** or initiating the swap process. This is useful for previewing swap parameters or validating input data without committing to an actual swap.
     *
     * This endpoint is the first required step in the swap process.
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
                401: `Unauthorized - API key or JWT token is invalid`,
            },
        });
    }
    /**
     * Check swap execution status
     * Retrieves the current status of a swap using the unique deposit address from the quote, if quote response included deposit memo, it is required as well.
     *
     * The response includes the state of the swap (e.g., pending, processing, success, refunded) and any associated swap and transaction details.
     * @param depositAddress
     * @param depositMemo
     * @returns GetExecutionStatusResponse
     * @throws ApiError
     */
    public static getExecutionStatus(
        depositAddress: string,
        depositMemo?: string,
    ): CancelablePromise<GetExecutionStatusResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/status',
            query: {
                'depositAddress': depositAddress,
                'depositMemo': depositMemo,
            },
            errors: {
                401: `Unauthorized - API key or JWT token is invalid`,
                404: `Deposit address not found`,
            },
        });
    }
    /**
     * Get ANY_INPUT withdrawals
     * Retrieves all withdrawals by ANY_INPUT quote with filtering, pagination and sorting
     * @param depositAddress
     * @param depositMemo
     * @param timestampFrom Filter withdrawals from this timestamp (ISO string)
     * @param page Page number for pagination (default: 1)
     * @param limit Number of withdrawals per page (max: 50, default: 50)
     * @param sortOrder Sort order
     * @returns GetAnyInputQuoteWithdrawals
     * @throws ApiError
     */
    public static getAnyInputQuoteWithdrawals(
        depositAddress: string,
        depositMemo?: string,
        timestampFrom?: string,
        page?: number,
        limit?: number,
        sortOrder?: 'asc' | 'desc',
    ): CancelablePromise<GetAnyInputQuoteWithdrawals> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/any-input/withdrawals',
            query: {
                'depositAddress': depositAddress,
                'depositMemo': depositMemo,
                'timestampFrom': timestampFrom,
                'page': page,
                'limit': limit,
                'sortOrder': sortOrder,
            },
            errors: {
                401: `Unauthorized - API key or JWT token is invalid`,
                404: `Deposit address not found`,
            },
        });
    }
    /**
     * Submit deposit transaction hash
     * Optionally notifies the 1Click service that a deposit has been sent to the specified address, using the blockchain transaction hash.
     *
     * This step can speed up swap processing by allowing the system to preemptively verify the deposit.
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
                401: `Unauthorized - API key or JWT token is invalid`,
            },
        });
    }
    /**
     * Generate an intent for signing
     * Generates an unsigned intent payload that needs to be signed by the user.
     *
     * This endpoint takes a quote's deposit address and other parameters, validates the quote state, and returns an intent payload formatted according to the specified signing standard (e.g., NEP413, ERC191).
     *
     * The generated intent must be signed by the user's wallet and then submitted via the `/submit-intent` endpoint to complete the action (e.g. swap).
     *
     * **Request Type Variants:**
     * - `swap_transfer`: Generate an intent for a swap operation (requires depositAddress, signerId, standard)
     * @param requestBody
     * @returns GenerateIntentResponse Successfully generated intent payload
     * @throws ApiError
     */
    public static generateIntent(
        requestBody: GenerateSwapTransferIntentRequest,
    ): CancelablePromise<GenerateIntentResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v0/generate-intent',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid input or quote state`,
                401: `Unauthorized - API key or JWT token is invalid`,
            },
        });
    }
    /**
     * Submit a signed intent
     * Submits a signed intent to execute.
     *
     * After generating an intent via `/generate-intent` and having the user sign it with their wallet, submit the signed intent through this endpoint.
     *
     * The system validates the signature, processes the intent, and returns the intent hash upon successful submission.
     *
     * **Request Type Variants:**
     * - `swap_transfer`: Submit a signed swap intent (requires signedData object)
     * @param requestBody
     * @returns SubmitIntentResponse Successfully submitted intent
     * @throws ApiError
     */
    public static submitIntent(
        requestBody: SubmitSwapTransferIntentRequest,
    ): CancelablePromise<SubmitIntentResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v0/submit-intent',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid signature or intent data`,
                401: `Unauthorized - API key or JWT token is invalid`,
            },
        });
    }
}
