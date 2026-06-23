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

const STAGING_DRY_BTC_USDT_QUOTE = {
  quote: {
    amountIn: '10000',
    amountInFormatted: '0.0001',
    amountInUsd: '6.252300000000',
    minAmountIn: '10000',
    amountOut: '5942131',
    amountOutFormatted: '5.942131',
    amountOutUsd: '5.934988558538',
    minAmountOut: '5882709',
    timeEstimate: 812,
    refundFee: '1900',
    withdrawFee: '300000',
  },
  quoteRequest: {
    dry: true,
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
    deadline: '2026-06-23T18:00:00.000Z',
    confidentiality: 'public',
    quoteWaitingTimeMs: 0,
    appFees: [
      {
        recipient: '5880ad2b362620fadf759cbceb1cd5737ce8c6ed7fb8e9942881e6731f9247dd',
        fee: 10,
      },
    ],
  },
  signature:
    'ed25519:5e31g5M7P75p2zyx8PYAfEjhvkuE9PHC297EKGBuAdkJq7ssSr7DPd9Pf7MCkCv8ntp6hUL7VYrpc5HARmVCnKh',
  timestamp: '2026-06-23T16:28:26.671Z',
  correlationId: 'e4a40811-7f3e-4299-8913-0850ac7513e0',
} as OneClickQuoteResponse;

const STAGING_STATUS_QUOTE_RESPONSE = {
  timestamp: '2026-06-23T16:29:59.275Z',
  signature:
    'ed25519:2942gnLcUL4aiTpntbB2EEzQkUPhDvo4YvDf8HN75mg18mRKpNNZGaNc8uGc67V9rTGTeFA1vBcTbsrQiFiFsUDr',
  signatureWithDepositAddress:
    'ed25519:2942gnLcUL4aiTpntbB2EEzQkUPhDvo4YvDf8HN75mg18mRKpNNZGaNc8uGc67V9rTGTeFA1vBcTbsrQiFiFsUDr',
  quoteRequest: {
    dry: false,
    swapType: 'EXACT_INPUT',
    depositMode: 'SIMPLE',
    slippageTolerance: 100,
    originAsset: '1cs_v1:btc:native:coin',
    depositType: 'ORIGIN_CHAIN',
    destinationAsset: 'nep141:eth-0xdac17f958d2ee523a2206206994597c13d831ec7.stft.near',
    amount: '10000',
    refundTo: 'bc1q6mte80265ghwq4vsrpm9lnaz46uvdreu9z8wly',
    refundType: 'ORIGIN_CHAIN',
    recipient: '0xcac3C41676deF4FE375E57118f3eB83A99105577',
    recipientType: 'DESTINATION_CHAIN',
    deadline: '2026-06-23T17:00:00.000Z',
    appFees: [
      {
        recipient: '5880ad2b362620fadf759cbceb1cd5737ce8c6ed7fb8e9942881e6731f9247dd',
        fee: 10,
      },
    ],
    virtualChainRecipient: null,
    virtualChainRefundRecipient: null,
    referral: null,
    confidentiality: 'public',
  },
  quote: {
    amountIn: '10000',
    amountInFormatted: '0.0001',
    amountInUsd: '6.251300000000',
    minAmountIn: '10000',
    amountOut: '5942330',
    amountOutFormatted: '5.94233',
    amountOutUsd: '5.935199204000',
    minAmountOut: '5882906',
    timeWhenInactive: '2026-06-26T17:00:00.000Z',
    depositAddress: 'bc1qx8uhjfnmmy7hprlefvc80f6kjmkhvwsjjpht3w',
    deadline: '2026-06-26T17:00:00.000Z',
    timeEstimate: 812,
    refundFee: '1900',
    withdrawFee: '300000',
  },
} as any;

describe('verifyQuoteSignature', () => {
  describe('with invalid signatures', () => {
    it('should reject when signatureWithDepositAddress is missing', () => {
      const { signatureWithDepositAddress: _, ...responseWithoutQuoteSignature } = STAGING_BTC_USDT_QUOTE;
      const result = verifyQuoteSignature(responseWithoutQuoteSignature);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('signatureWithDepositAddress is required for non-dry quote verification');
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

    it('should fail verification for provided dry quote payload', () => {
      const result = verifyQuoteSignature(STAGING_DRY_BTC_USDT_QUOTE);
      expect(result.valid).toBe(false);
    });
  });

  describe('status endpoint payload', () => {
    it('should verify provided status quoteResponse payload', () => {
      const result = _verifyQuoteSignatureInternal(
        STAGING_STATUS_QUOTE_RESPONSE,
        STAGING_STATUS_QUOTE_RESPONSE.signatureWithDepositAddress!,
        STAGING_MANAGER_PUB_KEY,
      );
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
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
