import { describe, it, expect, vi } from 'vitest';
import { verifyIntentDestination } from '../verify-destination';
import type { GetExecutionStatusResponse } from '../models/GetExecutionStatusResponse';

/**
 * These fixtures model `near/intents#384`.
 *
 * The real on-chain state cited in the issue:
 *   - quoted recipient: b45e38628bce420c8ebbaf0d2c2c12ec9863c7a0a9a04386d704760c085605c6
 *   - actual receiver_id in the executed intent:
 *       51e8f94d77b5e90dc9852ca6113771e11e8382ce69473a75e313e41665de7cbe
 *   - API status: SUCCESS, refundedAmount: 0, refundReason: null
 *
 * The mock RPC response below carries the shape `EXPERIMENTAL_tx_status`
 * returns on NEAR mainnet, with `receipts[].receipt.Action.actions[].FunctionCall`
 * on `intents.near` calling `execute_intents` with a base64-encoded args blob
 * whose decoded `signed[].payload` carries one `Transfer` intent.
 */

const QUOTED_RECIPIENT_1 =
    'b45e38628bce420c8ebbaf0d2c2c12ec9863c7a0a9a04386d704760c085605c6';
const ACTUAL_RECEIVER_SINK =
    '51e8f94d77b5e90dc9852ca6113771e11e8382ce69473a75e313e41665de7cbe';
const TX_HASH_384_1 = '3djtQ3pUHv8SGtNKS3CMGice7E7S9oeS4DJzNYyjCUVD';
const TX_HASH_384_2 = 'jNeJZQ4pa4p69LBiEvTDbTj2WmhCgiKRY2a2scA193j';

function encodeExecuteIntentsArgs(receiverId: string): string {
    const inner = {
        intents: [
            {
                intent: 'transfer',
                receiver_id: receiverId,
                tokens: { 'nep141:hood.omft.near': '38000000000000000' },
            },
        ],
    };
    const multiPayload = {
        standard: 'nep413',
        payload: JSON.stringify(inner),
    };
    const args = JSON.stringify({ signed: [multiPayload] });
    return Buffer.from(args, 'utf8').toString('base64');
}

function rpcResponseFor(receiverIdInIntent: string) {
    return {
        result: {
            receipts: [
                {
                    receiver_id: 'intents.near',
                    receipt: {
                        Action: {
                            actions: [
                                {
                                    FunctionCall: {
                                        method_name: 'execute_intents',
                                        args: encodeExecuteIntentsArgs(receiverIdInIntent),
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
        },
    };
}

function makeStatus(
    quotedRecipient: string,
    nearTxHashes: string[],
): GetExecutionStatusResponse {
    return {
        correlationId: 'test',
        status: 'SUCCESS' as GetExecutionStatusResponse['status'],
        updatedAt: '2026-11-02T00:00:00Z',
        quoteResponse: {
            quoteRequest: {
                recipient: quotedRecipient,
                recipientType: 'CONFIDENTIAL_INTENTS',
            },
            quote: {},
            timestamp: '2026-11-02T00:00:00Z',
            signature: 'ed25519:test',
        },
        swapDetails: {
            intentHashes: [],
            nearTxHashes,
            originChainTxHashes: [],
            destinationChainTxHashes: [],
        },
    } as unknown as GetExecutionStatusResponse;
}

function mockFetchForHashMap(hashToReceiverId: Record<string, string>): typeof fetch {
    return vi.fn(async (_url: unknown, init?: RequestInit) => {
        const body = JSON.parse((init?.body as string) ?? '{}') as {
            params?: unknown[];
        };
        const txHash = (body.params?.[0] as string) ?? '';
        const receiverId = hashToReceiverId[txHash];
        if (!receiverId) {
            return new Response(JSON.stringify({ result: { receipts: [] } }), {
                status: 200,
            });
        }
        return new Response(JSON.stringify(rpcResponseFor(receiverId)), {
            status: 200,
        });
    }) as unknown as typeof fetch;
}

describe('verifyIntentDestination', () => {
    it('flags the near/intents#384 misroute on both reported tx hashes', async () => {
        const status = makeStatus(QUOTED_RECIPIENT_1, [TX_HASH_384_1, TX_HASH_384_2]);
        const fetchMock = mockFetchForHashMap({
            [TX_HASH_384_1]: ACTUAL_RECEIVER_SINK,
            [TX_HASH_384_2]: ACTUAL_RECEIVER_SINK,
        });

        const verdict = await verifyIntentDestination(
            status,
            'https://rpc.mainnet.near.org',
            fetchMock,
        );

        expect(verdict.ok).toBe(false);
        if (verdict.ok) return;
        expect(verdict.reason).toBe('DESTINATION_MISMATCH');
        expect(verdict.quoted).toBe(QUOTED_RECIPIENT_1);
        expect(verdict.mismatched).toEqual([
            { txHash: TX_HASH_384_1, actual: ACTUAL_RECEIVER_SINK },
            { txHash: TX_HASH_384_2, actual: ACTUAL_RECEIVER_SINK },
        ]);
    });

    it('returns ok when the on-chain receiver_id matches the quoted recipient', async () => {
        const status = makeStatus(QUOTED_RECIPIENT_1, [TX_HASH_384_1]);
        const fetchMock = mockFetchForHashMap({
            [TX_HASH_384_1]: QUOTED_RECIPIENT_1,
        });

        const verdict = await verifyIntentDestination(
            status,
            'https://rpc.mainnet.near.org',
            fetchMock,
        );

        expect(verdict.ok).toBe(true);
        if (!verdict.ok) return;
        expect(verdict.verified).toBe(1);
    });

    it('returns ok with verified=0 when swapDetails has no NEAR tx hashes', async () => {
        const status = makeStatus(QUOTED_RECIPIENT_1, []);
        const fetchMock = mockFetchForHashMap({});

        const verdict = await verifyIntentDestination(
            status,
            'https://rpc.mainnet.near.org',
            fetchMock,
        );

        expect(verdict.ok).toBe(true);
        if (!verdict.ok) return;
        expect(verdict.verified).toBe(0);
    });

    it('treats a tx with no execute_intents receipt as nothing-to-verify (not a mismatch)', async () => {
        const status = makeStatus(QUOTED_RECIPIENT_1, [TX_HASH_384_1]);
        const fetchMock = vi.fn(async () =>
            new Response(JSON.stringify({ result: { receipts: [] } }), { status: 200 }),
        ) as unknown as typeof fetch;

        const verdict = await verifyIntentDestination(
            status,
            'https://rpc.mainnet.near.org',
            fetchMock,
        );

        // No execute_intents call extracted -> readIntentReceiverId returned null ->
        // not counted as a mismatch. verified reflects the hash count the SDK had,
        // not the number parsed successfully, so callers can tell when something
        // skipped vs. mismatched by their own logging.
        expect(verdict.ok).toBe(true);
    });

    it('reports a mismatch on one hash and leaves the other as nothing-to-verify', async () => {
        const status = makeStatus(QUOTED_RECIPIENT_1, [TX_HASH_384_1, TX_HASH_384_2]);
        const fetchMock = vi.fn(async (_url: unknown, init?: RequestInit) => {
            const body = JSON.parse((init?.body as string) ?? '{}') as {
                params?: unknown[];
            };
            const txHash = (body.params?.[0] as string) ?? '';
            if (txHash === TX_HASH_384_1) {
                return new Response(
                    JSON.stringify(rpcResponseFor(ACTUAL_RECEIVER_SINK)),
                    { status: 200 },
                );
            }
            return new Response(JSON.stringify({ result: { receipts: [] } }), {
                status: 200,
            });
        }) as unknown as typeof fetch;

        const verdict = await verifyIntentDestination(
            status,
            'https://rpc.mainnet.near.org',
            fetchMock,
        );

        expect(verdict.ok).toBe(false);
        if (verdict.ok) return;
        expect(verdict.mismatched).toEqual([
            { txHash: TX_HASH_384_1, actual: ACTUAL_RECEIVER_SINK },
        ]);
    });
});
