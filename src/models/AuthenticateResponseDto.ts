/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AuthenticateResponseDto = {
    /**
     * JWT access token for API calls
     */
    accessToken: string;
    /**
     * JWT refresh token for getting new access tokens
     */
    refreshToken: string;
    /**
     * Access token expiration time in seconds
     */
    expiresIn: number;
    /**
     * Refresh token expiration time in seconds
     */
    refreshExpiresIn: number;
};

