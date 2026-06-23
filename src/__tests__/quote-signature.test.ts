import { describe, it, expect } from 'vitest';
import {
  verifyQuoteSignature,
  _verifyQuoteSignatureInternal,
  type OneClickQuoteResponse,
} from '../quote-signature';

const STAGING_MANAGER_PUB_KEY = 'ed25519:5J5tkaxyPoR3Q9S8LXfo5bWnXK5Z2bctJ4mB9gENh7co';

const STAGING_BTC_USDT_QUOTE = {
  correlationId: 'bc3609c0-ff88-4bbb-8734-cbc062ecde01',
  timestamp: '2026-06-22T15:19:39.301Z',
  signature: 'ed25519:2fDPX1vJfUDK6pybzBQevi4bYh5AwJQ4q1rGamQSvWkzQvndtHLYUTefGw1wyPbq9BeWoBBvcXiUHmwd7BFejP95',
  signatureWithDepositAddress: 'ed25519:maryJqGEr8Vkn7zL6VUkhiMqWtG91pTNtBkkcGkQkyF3awqQS9v429Fhb2hHwqMykB14oycySTedQvCZZNGQa8f',
  quoteRequest: {
    dry: false,
    depositMode: 'SIMPLE',
    swapType: 'EXACT_INPUT',
    slippageTolerance: 100,
    originAsset: '1cs_v1:btc:native:coin',
    depositType: 'ORIGIN_CHAIN',
    destinationAsset: 'nep141:eth-0xdac17f958d2ee523a2206206994597c13d831ec7.stft.near',
    amount: '10000',
    refundTo: 'bc1q6mte80265ghwq4vsrpm9lnaz46uvdreu9z8wly',
    refundType: 'ORIGIN_CHAIN',
    recipient: '0xcac3C41676deF4FE375E57118f3eB83A99105577',
    recipientType: 'DESTINATION_CHAIN',
    deadline: '2026-06-22T15:24:39.000Z',
    confidentiality: 'public',
    quoteWaitingTimeMs: 0,
    appFees: [
      {
        recipient: '5880ad2b362620fadf759cbceb1cd5737ce8c6ed7fb8e9942881e6731f9247dd',
        fee: 10,
      },
    ],
  },
  quote: {
    amountIn: '10000',
    amountInFormatted: '0.0001',
    amountInUsd: '6.495900000000',
    minAmountIn: '10000',
    amountOut: '6180708',
    amountOutFormatted: '6.180708',
    amountOutUsd: '6.174255340848',
    minAmountOut: '6118900',
    timeEstimate: 812,
    refundFee: '1900',
    withdrawFee: '300000',
    deadline: '2026-06-25T15:24:39.000Z',
    timeWhenInactive: '2026-06-25T15:24:39.000Z',
    depositAddress: 'bc1qq7edtx63r9fw9h8qgaxjujfcxlxv4azmsvk46j',
  },
} as OneClickQuoteResponse;

const TAMPERED_DEPOSIT_ADDRESS = 'bc1q0000000000000000000000000000000000000000';
const FAKE_QUOTE_SIGNATURE = 'ed25519:5fVqoCrPgqS9WPqnX5xvHKNYBqRZPkXvEqM9VaHZXgBbPYp7qZzx5HkNvZxQK1hBkD2qT8GJfXwR9nL4mS6vYt2';

describe('verifyQuoteSignature', () => {
  describe('with invalid signatures', () => {
    it('should reject when signatureWithDepositAddress is missing', () => {
      const { signatureWithDepositAddress: _, ...responseWithoutQuoteSignature } = STAGING_BTC_USDT_QUOTE;
      const result = verifyQuoteSignature(responseWithoutQuoteSignature);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Quote signature is missing from quote response');
    });

    it('should reject an empty signature', () => {
      const result = _verifyQuoteSignatureInternal(
        STAGING_BTC_USDT_QUOTE,
        '',
        STAGING_MANAGER_PUB_KEY,
      );
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should reject a malformed signature', () => {
      const result = _verifyQuoteSignatureInternal(
        STAGING_BTC_USDT_QUOTE,
        'not-a-valid-signature',
        STAGING_MANAGER_PUB_KEY,
      );
      expect(result.valid).toBe(false);
    });

    it('should reject a signature not signed by the manager key', () => {
      const result = _verifyQuoteSignatureInternal(
        STAGING_BTC_USDT_QUOTE,
        FAKE_QUOTE_SIGNATURE,
        STAGING_MANAGER_PUB_KEY,
      );
      expect(result.valid).toBe(false);
    });
  });

  describe('Real quote signature verification (Staging)', () => {
    it('should verify real BTC signatureWithDepositAddress from staging', () => {
      const result = _verifyQuoteSignatureInternal(
        STAGING_BTC_USDT_QUOTE,
        STAGING_BTC_USDT_QUOTE.signatureWithDepositAddress!,
        STAGING_MANAGER_PUB_KEY,
      );
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject if deposit address is tampered (MITM simulation)', () => {
      const tamperedResponse = {
        ...STAGING_BTC_USDT_QUOTE,
        quote: {
          ...STAGING_BTC_USDT_QUOTE.quote,
          depositAddress: TAMPERED_DEPOSIT_ADDRESS,
        },
      };
      const result = _verifyQuoteSignatureInternal(
        tamperedResponse,
        STAGING_BTC_USDT_QUOTE.signatureWithDepositAddress!,
        STAGING_MANAGER_PUB_KEY,
      );
      expect(result.valid).toBe(false);
    });
  });
});
