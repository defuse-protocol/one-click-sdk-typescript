import { sha256 } from '@noble/hashes/sha2';
import { base58 } from '@scure/base';
import stringify from 'json-stable-stringify';
import nacl from 'tweetnacl';
import type { Quote } from './models/Quote';
import type { QuoteRequest } from './models/QuoteRequest';
import type { QuoteResponse } from './models/QuoteResponse';

const ED25519_PREFIX = 'ed25519:';
const ONE_CLICK_MANAGER_PUB_KEY =
    'ed25519:reYaWhvwu8Jzo3WUM3zhn6VrhuMEF4eADL17qtRVifc';

export type OneClickQuoteRequest = QuoteRequest;
export type OneClickQuote = Quote;
export type OneClickQuoteResponse = QuoteResponse;

export interface VerifyQuoteSignatureResult {
    valid: boolean;
    error?: string;
}

export function decodeEd25519Base58(value: string): Uint8Array {
    const encoded = value.startsWith(ED25519_PREFIX)
        ? value.slice(ED25519_PREFIX.length)
        : value;
    return base58.decode(encoded);
}

export function fullQuoteHash(response: OneClickQuoteResponse): string {
    const { quoteRequest } = response;

    const dataString = stringify({
        dry: quoteRequest.dry,
        swapType: quoteRequest.swapType,
        slippageTolerance: quoteRequest.slippageTolerance,
        originAsset: quoteRequest.originAsset,
        depositType: quoteRequest.depositType,
        destinationAsset: quoteRequest.destinationAsset,
        amount: quoteRequest.amount,
        refundTo: quoteRequest.refundTo,
        refundType: quoteRequest.refundType,
        recipient: quoteRequest.recipient,
        recipientType: quoteRequest.recipientType,
        deadline: quoteRequest.deadline,
        quoteWaitingTimeMs: quoteRequest.quoteWaitingTimeMs || undefined,
        referral: quoteRequest.referral || undefined,
        virtualChainRecipient: quoteRequest.virtualChainRecipient || undefined,
        virtualChainRefundRecipient: quoteRequest.virtualChainRefundRecipient || undefined,
        customRecipientMsg: quoteRequest.customRecipientMsg || undefined,
        ...response.quote,
        timestamp: response.timestamp,
    });

    return base58.encode(sha256(new TextEncoder().encode(dataString)));
}

function verifyByHash(
    hash: string,
    signature: string,
    managerPublicKey: string,
): VerifyQuoteSignatureResult {
    try {
        const signatureBytes = decodeEd25519Base58(signature);
        const publicKeyBytes = decodeEd25519Base58(managerPublicKey);
        const message = new TextEncoder().encode(hash);
        return { valid: nacl.sign.detached.verify(message, signatureBytes, publicKeyBytes) };
    } catch (error) {
        return {
        valid: false,
        error: `Verification error: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
}

// so we can test internally with pure functional pattern
export function _verifyQuoteSignatureInternal(
    response: OneClickQuoteResponse,
    signatureWithDepositAddress: string,
    managerPublicKey: string,
): VerifyQuoteSignatureResult {
    return verifyByHash(
        fullQuoteHash(response),
        signatureWithDepositAddress,
        managerPublicKey,
    );
}

export function verifyQuoteSignature(
    response: OneClickQuoteResponse,
): VerifyQuoteSignatureResult {
    const isDryQuote = response.quoteRequest?.dry === true;
    
    if (!isDryQuote && !response.signatureWithDepositAddress) {
        return {
        valid: false,
        error:'signatureWithDepositAddress is required for non-dry quote verification',
        };
    }
    const signature = response.signatureWithDepositAddress ?? response.signature;
    return verifyByHash(fullQuoteHash(response), signature, ONE_CLICK_MANAGER_PUB_KEY);
}