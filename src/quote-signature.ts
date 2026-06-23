import { sha256 } from '@noble/hashes/sha2';
import { base58 } from '@scure/base';
import stringify from 'json-stable-stringify';
import nacl from 'tweetnacl';
import type { Quote } from './models/Quote';
import type { QuoteRequest } from './models/QuoteRequest';
import type { QuoteResponse } from './models/QuoteResponse';

const ED25519_PREFIX = 'ed25519:';
export const ONE_CLICK_MANAGER_PUB_KEY =
  'ed25519:reYaWhvwu8Jzo3WUM3zhn6VrhuMEF4eADL17qtRVifc';

export type OneClickQuoteRequest = QuoteRequest;
export type OneClickQuote = Quote;
export type OneClickQuoteResponse = QuoteResponse

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
        sessionId: undefined,
        connectedWallets: undefined,
        correlationId: undefined,
        appFees: undefined,
        partnerId: undefined,
        userAccountId: undefined,
        depositMode: undefined,
        ...response.quote,
        timestamp: response.timestamp,
    });

    return base58.encode(sha256(new TextEncoder().encode(dataString)));
}

// so we can test internally with pure functional pattern
export function _verifyQuoteSignatureInternal(
    response: OneClickQuoteResponse,
    signatureWithDepositAddress: string,
    managerPublicKey: string,
): VerifyQuoteSignatureResult {
    try {
        const signatureBytes = decodeEd25519Base58(signatureWithDepositAddress);
        const publicKeyBytes = decodeEd25519Base58(managerPublicKey);
        const message = new TextEncoder().encode(fullQuoteHash(response));

        return { valid: nacl.sign.detached.verify(message, signatureBytes, publicKeyBytes) };
    } catch (error) {
        return {
            valid: false,
            error: `Verification error: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
}

export function verifyQuoteSignature(
    response: OneClickQuoteResponse,
): VerifyQuoteSignatureResult {
    if (!response.signatureWithDepositAddress) {
        return { valid: false, error: 'Quote signature is missing from quote response' };
    }
    return _verifyQuoteSignatureInternal(
        response,
        response.signatureWithDepositAddress,
        ONE_CLICK_MANAGER_PUB_KEY,
    );
}