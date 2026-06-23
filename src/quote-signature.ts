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
export type OneClickQuoteResponse = QuoteResponse & {
    signatureWithDepositAddress?: string;
};

export type SignatureVerificationResult = {
    valid: boolean;
    error?: string;
};

export type OneClickSignedQuoteRequest = {
    dry: QuoteRequest['dry'];
    swapType: QuoteRequest['swapType'];
    slippageTolerance: QuoteRequest['slippageTolerance'];
    originAsset: QuoteRequest['originAsset'];
    depositType: QuoteRequest['depositType'];
    destinationAsset: QuoteRequest['destinationAsset'];
    amount: QuoteRequest['amount'];
    refundTo: QuoteRequest['refundTo'];
    refundType: QuoteRequest['refundType'];
    recipient: QuoteRequest['recipient'];
    recipientType: QuoteRequest['recipientType'];
    deadline: QuoteRequest['deadline'];
    quoteWaitingTimeMs?: QuoteRequest['quoteWaitingTimeMs'];
    referral?: QuoteRequest['referral'];
    virtualChainRecipient?: QuoteRequest['virtualChainRecipient'];
    virtualChainRefundRecipient?: QuoteRequest['virtualChainRefundRecipient'];
    customRecipientMsg?: QuoteRequest['customRecipientMsg'];
    sessionId?: undefined;
    connectedWallets?: undefined;
    correlationId?: undefined;
    appFees?: undefined;
    partnerId?: undefined;
    userAccountId?: undefined;
    depositMode?: undefined;
};

export type OneClickSignedQuote = {
    amountIn: Quote['amountIn'];
    amountInFormatted: Quote['amountInFormatted'];
    amountInUsd: Quote['amountInUsd'];
    minAmountIn: Quote['minAmountIn'];
    amountOut: Quote['amountOut'];
    amountOutFormatted: Quote['amountOutFormatted'];
    amountOutUsd: Quote['amountOutUsd'];
    minAmountOut: Quote['minAmountOut'];
};

export type OneClickFullSignedQuote = OneClickSignedQuote & {
    depositAddress?: Quote['depositAddress'];
    depositMemo?: Quote['depositMemo'];
    deadline?: Quote['deadline'];
    timeWhenInactive?: Quote['timeWhenInactive'];
    timeEstimate?: Quote['timeEstimate'];
    virtualChainRecipient?: Quote['virtualChainRecipient'];
    virtualChainRefundRecipient?: Quote['virtualChainRefundRecipient'];
    customRecipientMsg?: Quote['customRecipientMsg'];
    refundFee?: Quote['refundFee'];
    withdrawFee?: Quote['withdrawFee'];
};

export function buildSignedQuoteRequest(
    response: OneClickQuoteResponse,
): OneClickSignedQuoteRequest {
    const { quoteRequest } = response;

    return {
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
        quoteWaitingTimeMs: quoteRequest.quoteWaitingTimeMs
            ? quoteRequest.quoteWaitingTimeMs
            : undefined,
        referral: quoteRequest.referral ? quoteRequest.referral : undefined,
        virtualChainRecipient: quoteRequest.virtualChainRecipient
            ? quoteRequest.virtualChainRecipient
            : undefined,
        virtualChainRefundRecipient: quoteRequest.virtualChainRefundRecipient
            ? quoteRequest.virtualChainRefundRecipient
            : undefined,
        customRecipientMsg: quoteRequest.customRecipientMsg
            ? quoteRequest.customRecipientMsg
            : undefined,
        sessionId: undefined,
        connectedWallets: undefined,
        correlationId: undefined,
        appFees: undefined,
        partnerId: undefined,
        userAccountId: undefined,
        depositMode: undefined,
    };
}

export function buildSignedQuote(
    response: OneClickQuoteResponse,
): OneClickSignedQuote {
    const { quote } = response;

    return {
        amountIn: quote.amountIn,
        amountInFormatted: quote.amountInFormatted,
        amountInUsd: quote.amountInUsd,
        minAmountIn: quote.minAmountIn,
        amountOut: quote.amountOut,
        amountOutFormatted: quote.amountOutFormatted,
        amountOutUsd: quote.amountOutUsd,
        minAmountOut: quote.minAmountOut,
    };
}

export function buildFullSignedQuote(
    response: OneClickQuoteResponse,
): OneClickFullSignedQuote {
    const { quote } = response;

    return {
        amountIn: quote.amountIn,
        amountInFormatted: quote.amountInFormatted,
        amountInUsd: quote.amountInUsd,
        minAmountIn: quote.minAmountIn,
        amountOut: quote.amountOut,
        amountOutFormatted: quote.amountOutFormatted,
        amountOutUsd: quote.amountOutUsd,
        minAmountOut: quote.minAmountOut,
        depositAddress: quote.depositAddress ? quote.depositAddress : undefined,
        depositMemo: quote.depositMemo ? quote.depositMemo : undefined,
        deadline: quote.deadline ? quote.deadline : undefined,
        timeWhenInactive: quote.timeWhenInactive
            ? quote.timeWhenInactive
            : undefined,
        timeEstimate: quote.timeEstimate ? quote.timeEstimate : undefined,
        virtualChainRecipient: quote.virtualChainRecipient
            ? quote.virtualChainRecipient
            : undefined,
        virtualChainRefundRecipient: quote.virtualChainRefundRecipient
            ? quote.virtualChainRefundRecipient
            : undefined,
        customRecipientMsg: quote.customRecipientMsg
            ? quote.customRecipientMsg
            : undefined,
        refundFee: quote.refundFee ? quote.refundFee : undefined,
        withdrawFee: quote.withdrawFee ? quote.withdrawFee : undefined,
    };
}

export function hashQuote(
    request: OneClickSignedQuoteRequest,
    quote: OneClickSignedQuote | OneClickFullSignedQuote,
    timestamp: string,
): string {
    const dataString = stringify({
        ...request,
        ...quote,
        timestamp,
    });

    return base58.encode(sha256(new TextEncoder().encode(dataString)));
}

export function quoteHash(response: OneClickQuoteResponse): string {
    return hashQuote(
        buildSignedQuoteRequest(response),
        buildSignedQuote(response),
        response.timestamp,
    );
}

export function fullQuoteHash(response: OneClickQuoteResponse): string {
    return hashQuote(
        buildSignedQuoteRequest(response),
        buildFullSignedQuote(response),
        response.timestamp,
    );
}

/**
 * Internal verification function that verifies a response against a specific signature.
 * Use this for direct verification when you have the signature to verify against.
 * Always verifies against the full payload (with deposit address).
 */
export function _verifyQuoteSignatureInternal(
    response: OneClickQuoteResponse,
    signature: string,
    managerPublicKey = ONE_CLICK_MANAGER_PUB_KEY,
): SignatureVerificationResult {
    try {
        if (!signature) {
            return { valid: false, error: 'Signature is empty' };
        }

        const signatureBytes = decodeEd25519Base58(signature);
        const publicKeyBytes = decodeEd25519Base58(managerPublicKey);
        const message = new TextEncoder().encode(fullQuoteHash(response));

        const valid = nacl.sign.detached.verify(
            message,
            signatureBytes,
            publicKeyBytes,
        );
        return { valid };
    } catch (error) {
        return {
            valid: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Signature verification failed',
        };
    }
}

/**
 * Verifies the quote signature based on the dry flag:
 * - For dry quotes (dry: true): verifies against the minimal payload using `signature`
 * - For non-dry quotes (dry: false): verifies against the full payload using `signatureWithDepositAddress`
 *
 * For responses from the status endpoint (which are always non-dry), use
 * `signatureWithDepositAddress` for verification.
 */
export function verifyQuoteSignature(
    response: OneClickQuoteResponse,
    managerPublicKey = ONE_CLICK_MANAGER_PUB_KEY,
): SignatureVerificationResult {
    const isDry = response.quoteRequest.dry;

    if (isDry) {
        return _verifyDryQuoteSignature(response, managerPublicKey);
    }

    return _verifyNonDryQuoteSignature(response, managerPublicKey);
}

function _verifyDryQuoteSignature(
    response: OneClickQuoteResponse,
    managerPublicKey: string,
): SignatureVerificationResult {
    try {
        if (!response.signature) {
            return { valid: false, error: 'Signature is missing for dry quote' };
        }

        const signatureBytes = decodeEd25519Base58(response.signature);
        const publicKeyBytes = decodeEd25519Base58(managerPublicKey);
        const message = new TextEncoder().encode(quoteHash(response));

        const valid = nacl.sign.detached.verify(
            message,
            signatureBytes,
            publicKeyBytes,
        );
        return { valid };
    } catch (error) {
        return {
            valid: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Dry quote signature verification failed',
        };
    }
}

function _verifyNonDryQuoteSignature(
    response: OneClickQuoteResponse,
    managerPublicKey: string,
): SignatureVerificationResult {
    if (!response.signatureWithDepositAddress) {
        return {
            valid: false,
            error: 'signatureWithDepositAddress is required for non-dry quote verification',
        };
    }

    return _verifyQuoteSignatureInternal(
        response,
        response.signatureWithDepositAddress,
        managerPublicKey,
    );
}

function decodeEd25519Base58(value: string): Uint8Array {
    const encoded = value.startsWith(ED25519_PREFIX)
        ? value.slice(ED25519_PREFIX.length)
        : value;
    return base58.decode(encoded);
}
