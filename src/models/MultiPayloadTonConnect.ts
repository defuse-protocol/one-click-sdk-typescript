/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * TonConnect: The standard for data signing in TON blockchain platform. For more details, refer to [TonConnect documentation](https://docs.tonconsole.com/academy/sign-data).
 */
export type MultiPayloadTonConnect = {
    /**
     * Wallet address in either [Raw](https://docs.ton.org/v3/documentation/smart-contracts/addresses/address-formats#raw-address) representation or [user-friendly](https://docs.ton.org/v3/documentation/smart-contracts/addresses/address-formats#user-friendly-address) format
     */
    address: string;
    /**
     * dApp domain
     */
    domain: string;
    /**
     * See <https://docs.tonconsole.com/academy/sign-data#choosing-the-right-format>
     */
    payload: {
        text: string;
        type: MultiPayloadTonConnect.type;
    };
    /**
     * Encoding: base58
     */
    public_key: string;
    /**
     * Encoding: base58
     */
    signature: string;
    standard: MultiPayloadTonConnect.standard;
    /**
     * UNIX timestamp (in seconds or RFC3339) at the time of singing
     */
    timestamp: (string | number);
};
export namespace MultiPayloadTonConnect {
    export enum type {
        TEXT = 'text',
    }
    export enum standard {
        TON_CONNECT = 'ton_connect',
    }
}

