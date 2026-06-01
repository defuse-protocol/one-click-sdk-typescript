/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Assuming wallets want to interact with Intents protocol, besides preparing the data in a certain form, they have to have the capability to sign raw messages (off-chain signatures) using an algorithm we understand. This enum solves that problem.
 *
 * For example, because we support ERC-191 and know how to verify messages with that standard, we can allow wallets, like Metamask, sign messages to perform intents without having to support new cryptographic primitives and signing standards.
 */
export type MultiPayload = ({
    /**
     * See [NEP-413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md)
     */
    payload: {
        callbackUrl?: string | null;
        message: string;
        /**
         * Encoding: base64
         */
        nonce: string;
        recipient: string;
    };
    /**
     * Encoding: base58
     */
    public_key: string;
    /**
     * Encoding: base58
     */
    signature: string;
    standard: MultiPayload.standard;
} | {
    /**
     * See [ERC-191](https://github.com/ethereum/ercs/blob/master/ERCS/erc-191.md)
     */
    payload: string;
    /**
     * There is no public key member because the public key can be recovered via `ecrecover()` knowing the data and the signature. Encoding: base58
     */
    signature: string;
    standard: MultiPayload.standard;
} | {
    /**
     * See [TIP-191](https://github.com/tronprotocol/tips/blob/master/tip-191.md)
     */
    payload: string;
    /**
     * There is no public key member because the public key can be recovered via `ecrecover()` knowing the data and the signature. Encoding: base58
     */
    signature: string;
    standard: MultiPayload.standard;
} | {
    payload: string;
    /**
     * Encoding: base58
     */
    public_key: string;
    /**
     * Encoding: base58
     */
    signature: string;
    standard: MultiPayload.standard;
} | {
    /**
     * Base64Url-encoded [authenticatorData](https://w3c.github.io/webauthn/#authenticator-data). Encoding: base64
     */
    authenticator_data: string;
    /**
     * Serialized [clientDataJSON](https://w3c.github.io/webauthn/#dom-authenticatorresponse-clientdatajson)
     */
    client_data_json: string;
    payload: string;
    standard: MultiPayload.standard;
    /**
     * Encoding: base58
     */
    public_key: string;
    /**
     * Encoding: base58
     */
    signature: string;
} | {
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
        type: MultiPayload.type;
    };
    /**
     * Encoding: base58
     */
    public_key: string;
    /**
     * Encoding: base58
     */
    signature: string;
    standard: MultiPayload.standard;
    /**
     * UNIX timestamp (in seconds or RFC3339) at the time of singing
     */
    timestamp: (string | number);
});
export namespace MultiPayload {
    export enum standard {
        NEP413 = 'nep413',
    }
    export enum type {
        TEXT = 'text',
    }
}

