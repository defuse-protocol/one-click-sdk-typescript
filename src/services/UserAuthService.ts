/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthenticateRequestDto } from '../models/AuthenticateRequestDto';
import type { AuthenticateResponseDto } from '../models/AuthenticateResponseDto';
import type { RefreshRequestDto } from '../models/RefreshRequestDto';
import type { RefreshResponseDto } from '../models/RefreshResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserAuthService {
    /**
     * Authenticate user with signed data
     * Verifies wallet signature and issues session tokens
     * @param requestBody
     * @returns AuthenticateResponseDto
     * @throws ApiError
     */
    public static authenticate(
        requestBody: AuthenticateRequestDto,
    ): CancelablePromise<AuthenticateResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v0/auth/authenticate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid signed data`,
                401: `Signature verification failed`,
            },
        });
    }
    /**
     * Refresh access token
     * Exchange refresh token for a new access token
     * @param requestBody
     * @returns RefreshResponseDto
     * @throws ApiError
     */
    public static refresh(
        requestBody: RefreshRequestDto,
    ): CancelablePromise<RefreshResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v0/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid or expired refresh token`,
            },
        });
    }
}
