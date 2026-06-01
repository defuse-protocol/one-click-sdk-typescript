import { sha256 } from 'js-sha256';
import nacl from 'tweetnacl';

import { CancelablePromise } from './core/CancelablePromise';
import type { QuoteResponse } from './models/QuoteResponse';

const ONE_CLICK_PUBLIC_KEY = 'ed25519:reYaWhvwu8Jzo3WUM3zhn6VrhuMEF4eADL17qtRVifc';
const SIGNATURE_PREFIX = 'ed25519:';
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const textEncoder = new TextEncoder();

export class QuoteSignatureVerificationError extends Error {
    public readonly quoteResponse: QuoteResponse;

    constructor(message: string, quoteResponse: QuoteResponse) {
        super(message);
        this.name = 'QuoteSignatureVerificationError';
        this.quoteResponse = quoteResponse;
    }
}

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue | undefined };

const isPlainObject = (value: unknown): value is Record<string, JsonValue | undefined> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const stableStringify = (value: JsonValue): string => {
    if (Array.isArray(value)) {
        return `[${value.map((item) => stableStringify(item)).join(',')}]`;
    }

    if (isPlainObject(value)) {
        return `{${Object.keys(value)
            .filter((key) => value[key] !== undefined)
            .sort()
            .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key] as JsonValue)}`)
            .join(',')}}`;
    }

    return JSON.stringify(value);
};

const decodeBase58 = (value: string): Uint8Array => {
    const bytes = [0];

    for (const char of value) {
        const index = BASE58_ALPHABET.indexOf(char);
        if (index === -1) {
            throw new Error(`Invalid base58 character: ${char}`);
        }

        let carry = index;
        for (let i = 0; i < bytes.length; i += 1) {
            carry += bytes[i] * 58;
            bytes[i] = carry & 0xff;
            carry >>= 8;
        }

        while (carry > 0) {
            bytes.push(carry & 0xff);
            carry >>= 8;
        }
    }

    for (const char of value) {
        if (char !== '1') {
            break;
        }
        bytes.push(0);
    }

    return new Uint8Array(bytes.reverse());
};

const getEd25519Value = (value: string, fieldName: string): string => {
    if (!value.startsWith(SIGNATURE_PREFIX)) {
        throw new Error(`${fieldName} must start with ${SIGNATURE_PREFIX}`);
    }

    return value.slice(SIGNATURE_PREFIX.length);
};

export const getCanonicalQuotePayload = (quoteResponse: QuoteResponse): string => {
    return `{${[
        `${JSON.stringify('quoteRequest')}:${stableStringify(quoteResponse.quoteRequest as JsonValue)}`,
        `${JSON.stringify('quote')}:${stableStringify(quoteResponse.quote as JsonValue)}`,
        `${JSON.stringify('timestamp')}:${stableStringify(quoteResponse.timestamp as JsonValue)}`,
    ].join(',')}}`;
};

export const getCanonicalQuoteHash = (quoteResponse: QuoteResponse): string => {
    return sha256(getCanonicalQuotePayload(quoteResponse));
};

const verifyQuoteResponseSignatureStrict = (quoteResponse: QuoteResponse): boolean => {
    const signature = decodeBase58(getEd25519Value(quoteResponse.signature, 'Quote signature'));
    const publicKey = decodeBase58(getEd25519Value(ONE_CLICK_PUBLIC_KEY, '1Click public key'));
    const message = textEncoder.encode(getCanonicalQuoteHash(quoteResponse));

    return nacl.sign.detached.verify(message, signature, publicKey);
};

export const verifyQuoteResponseSignature = (quoteResponse: QuoteResponse): boolean => {
    try {
        return verifyQuoteResponseSignatureStrict(quoteResponse);
    } catch {
        return false;
    }
};

export const verifyQuoteResponseOrThrow = (quoteResponse: QuoteResponse): QuoteResponse => {
    if (!verifyQuoteResponseSignature(quoteResponse)) {
        throw new QuoteSignatureVerificationError('1Click quote signature verification failed', quoteResponse);
    }

    return quoteResponse;
};

export const withQuoteSignatureVerification = (promise: CancelablePromise<QuoteResponse>): CancelablePromise<QuoteResponse> => {
    return new CancelablePromise<QuoteResponse>((resolve, reject, onCancel) => {
        onCancel(() => promise.cancel());

        promise
            .then((quoteResponse) => {
                try {
                    resolve(verifyQuoteResponseOrThrow(quoteResponse));
                } catch (error) {
                    reject(error);
                }
            })
            .catch(reject);
    });
};
