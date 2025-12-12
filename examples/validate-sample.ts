import { QuoteResponse } from "../src/models/QuoteResponse";

export const quoteSample = {
    quote: {
        depositAddress: '0x4dD16013943f8868233106A45e623018265c6cBD',
        amountIn: '306002',
        amountInFormatted: '0.306002',
        amountInUsd: '0.3060',
        minAmountIn: '306002',
        amountOut: '2999',
        amountOutFormatted: '0.002999',
        amountOutUsd: '0.0030',
        minAmountOut: '2969',
        timeEstimate: 52
    },
    quoteRequest: {
        dry: false,
        depositMode: 'SIMPLE',
        swapType: 'EXACT_INPUT',
        slippageTolerance: 100,
        originAsset: 'nep141:eth-0xdac17f958d2ee523a2206206994597c13d831ec7.omft.near',
        depositType: 'ORIGIN_CHAIN',
        destinationAsset: 'nep141:eth-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.omft.near',
        amount: '306002',
        refundTo: '0x2527D02599Ba641c19FEa793cD0F167589a0f10D',
        refundType: 'ORIGIN_CHAIN',
        recipient: '0xCEf67989ae740cC9c92fa7385F003F84EAAFd915',
        connectedWallets: ['0x123...', '0x456...'],
        sessionId: 'session_abc123',
        recipientType: 'DESTINATION_CHAIN',
        deadline: '2025-12-24T14:15:22.000Z',
        referral: 'referral',
        quoteWaitingTimeMs: 3000,
        appFees: []
    },
    signature: 'ed25519:2zQeSBT2DEAE6B35G61TQuwFPki4unFWnhotCQvHqMnywDR2V6hp2u36LqcpuzNSGhNrLcAU8vvDwsbHocejG7Qe',
    timestamp: '2025-12-11T11:16:28.633Z',
    correlationId: 'b6f76515-db22-4ae9-82cb-d9b36687fb1c'
} as QuoteResponse;