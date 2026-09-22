/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JsonApiCollectionMeta } from '../models/JsonApiCollectionMeta';
import type { JsonApiMeta } from '../models/JsonApiMeta';
import type { LimitOrderAttributes } from '../models/LimitOrderAttributes';
import type { LimitOrderCreateRequest } from '../models/LimitOrderCreateRequest';
import type { OrderFillStatusEnum } from '../models/OrderFillStatusEnum';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrderService {
    /**
     * Create an order
     * Creates a confidential order.
     *
     * **Errors.** Branch on `code`, never on `title` or `detail`. New codes arrive without a major
     * version, so treat an unrecognized code as the HTTP status alone.
     *
     * | Status | Codes |
     * | --- | --- |
     * | 400 | `malformed-request`, `validation-failed`, `request-rejected`, `order-rejected` |
     * | 401 | `authentication-required` |
     * | 403 | `client-generated-id` |
     * | 409 | `resource-type-mismatch` |
     * | 429 | `rate-limit-exceeded` |
     * | 500 | `internal-error` |
     * | 503 | `service-unavailable` |
     * @param requestBody
     * @returns any Order created.
     * @throws ApiError
     */
    public static createOrder(
        requestBody: {
            data: {
                type: 'orders';
                attributes: LimitOrderCreateRequest;
            };
        },
    ): CancelablePromise<{
        data: {
            type: 'orders';
            /**
             * Opaque resource identifier. Clients should treat IDs as opaque and not rely on the prefix or length.
             */
            id: string;
            attributes: LimitOrderAttributes;
            links: {
                self: string;
            };
        };
        meta: JsonApiMeta;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v0/orders',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Malformed request, Validation failed, Request rejected, Order rejected`,
                401: `Authentication required`,
                403: `Client generated id`,
                409: `Resource type mismatch`,
                429: `Rate limit exceeded`,
                500: `Internal error`,
                503: `Service unavailable`,
            },
        });
    }
    /**
     * List orders
     * Retrieves visible orders, newest first.
     *
     * **Errors.** Branch on `code`, never on `title` or `detail`. New codes arrive without a major
     * version, so treat an unrecognized code as the HTTP status alone.
     *
     * | Status | Codes |
     * | --- | --- |
     * | 400 | `validation-failed` |
     * | 401 | `authentication-required` |
     * | 429 | `rate-limit-exceeded` |
     * | 500 | `internal-error` |
     * | 503 | `service-unavailable` |
     * @param filterFillStatus Filter by one or more fill statuses.
     * @param filterIsPayoutStatusFinal Filter by whether payout processing reached a final status.
     * @param pageSize
     * @param pageAfter Opaque cursor after which the page starts.
     * @returns any
     * @throws ApiError
     */
    public static listOrders(
        filterFillStatus?: Array<OrderFillStatusEnum>,
        filterIsPayoutStatusFinal?: boolean,
        pageSize: number = 50,
        pageAfter?: string,
    ): CancelablePromise<{
        data: Array<{
            type: 'orders';
            /**
             * Opaque resource identifier. Clients should treat IDs as opaque and not rely on the prefix or length.
             */
            id: string;
            attributes: LimitOrderAttributes;
            links: {
                self: string;
            };
        }>;
        links: {
            next: string | null;
        };
        meta: JsonApiCollectionMeta;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/orders',
            query: {
                'filter[fillStatus]': filterFillStatus,
                'filter[isPayoutStatusFinal]': filterIsPayoutStatusFinal,
                'page[size]': pageSize,
                'page[after]': pageAfter,
            },
            errors: {
                400: `Validation failed`,
                401: `Authentication required`,
                429: `Rate limit exceeded`,
                500: `Internal error`,
                503: `Service unavailable`,
            },
        });
    }
    /**
     * Cancel an order
     * Requests asynchronous cancellation. Unspent input is refunded and successfully filled output is withdrawn.
     *
     * **Errors.** Branch on `code`, never on `title` or `detail`. New codes arrive without a major
     * version, so treat an unrecognized code as the HTTP status alone.
     *
     * | Status | Codes |
     * | --- | --- |
     * | 400 | `order-rejected` |
     * | 401 | `authentication-required` |
     * | 404 | `order-not-found` |
     * | 429 | `rate-limit-exceeded` |
     * | 500 | `internal-error` |
     * | 503 | `service-unavailable` |
     * @param orderId Opaque order identifier.
     * @returns any Cancellation requested.
     * @throws ApiError
     */
    public static cancelOrder(
        orderId: string,
    ): CancelablePromise<{
        data: {
            type: 'orders';
            /**
             * Opaque resource identifier. Clients should treat IDs as opaque and not rely on the prefix or length.
             */
            id: string;
            attributes: LimitOrderAttributes;
            links: {
                self: string;
            };
        };
        meta: JsonApiMeta;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v0/orders/{orderId}/cancel',
            path: {
                'orderId': orderId,
            },
            errors: {
                400: `Order rejected`,
                401: `Authentication required`,
                404: `Order not found`,
                429: `Rate limit exceeded`,
                500: `Internal error`,
                503: `Service unavailable`,
            },
        });
    }
    /**
     * Get an order
     * Retrieves an order.
     *
     * **Errors.** Branch on `code`, never on `title` or `detail`. New codes arrive without a major
     * version, so treat an unrecognized code as the HTTP status alone.
     *
     * | Status | Codes |
     * | --- | --- |
     * | 401 | `authentication-required` |
     * | 404 | `order-not-found` |
     * | 429 | `rate-limit-exceeded` |
     * | 500 | `internal-error` |
     * | 503 | `service-unavailable` |
     * @param orderId Opaque order identifier.
     * @returns any
     * @throws ApiError
     */
    public static getOrder(
        orderId: string,
    ): CancelablePromise<{
        data: {
            type: 'orders';
            /**
             * Opaque resource identifier. Clients should treat IDs as opaque and not rely on the prefix or length.
             */
            id: string;
            attributes: LimitOrderAttributes;
            links: {
                self: string;
            };
        };
        meta: JsonApiMeta;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/orders/{orderId}',
            path: {
                'orderId': orderId,
            },
            errors: {
                401: `Authentication required`,
                404: `Order not found`,
                429: `Rate limit exceeded`,
                500: `Internal error`,
                503: `Service unavailable`,
            },
        });
    }
}
