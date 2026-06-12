import { sha256 } from '@noble/hashes/sha2';
import { base58 } from '@scure/base';
import stringify from 'json-stable-stringify';
import nacl from 'tweetnacl';
import { ONE_CLICK_MANAGER_PUB_KEY } from './constants';

import type { Quote } from './models/Quote';
import type { QuoteRequest } from './models/QuoteRequest';
import type { QuoteResponse } from './models/QuoteResponse';

const ED25519_PREFIX = 'ed25519:';

export type OneClickQuoteRequest = QuoteRequest;
export type OneClickQuote = Quote;
export type OneClickQuoteResponse = QuoteResponse;

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

export function decodeEd25519Base58(value: string): Uint8Array {
    const encoded = value.startsWith(ED25519_PREFIX)
        ? value.slice(ED25519_PREFIX.length)
        : value;
    return base58.decode(encoded);
}

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

export function hashQuote(
    request: OneClickSignedQuoteRequest,
    quote: OneClickSignedQuote,
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

export function verifyQuoteSignature(
    response: OneClickQuoteResponse,
    managerPublicKey = ONE_CLICK_MANAGER_PUB_KEY,
): boolean {
    try {
        const signatureBytes = decodeEd25519Base58(response.signature);
        const publicKeyBytes = decodeEd25519Base58(managerPublicKey);
        const message = new TextEncoder().encode(quoteHash(response));

        return nacl.sign.detached.verify(message, signatureBytes, publicKeyBytes);
    } catch {
        return false;
    }
}