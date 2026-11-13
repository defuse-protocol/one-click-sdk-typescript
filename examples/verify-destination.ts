/**
 * Live integration example: run the two tx hashes from near/intents#384
 * through verifyIntentDestination against NEAR mainnet.
 *
 * This is the real-world adversarial case the helper exists to catch.
 * Expected output:
 *   {
 *     ok: false,
 *     quoted: 'b45e...605c6',
 *     mismatched: [{ txHash: '3djtQ3pU...', actual: '51e8f94d...de7cbe' }, ...],
 *     reason: 'DESTINATION_MISMATCH'
 *   }
 *
 * Run from the SDK repo root:
 *   npx tsx examples/verify-destination.ts
 *
 * No private key needed — this reads mainnet state only.
 */

import { verifyIntentDestination } from '../src/verify-destination';
import type { GetExecutionStatusResponse } from '../src/models/GetExecutionStatusResponse';

const NEAR_MAINNET_RPC = 'https://rpc.mainnet.near.org';

const STATUS_FROM_384: GetExecutionStatusResponse = {
    correlationId: 'near-intents-384-replay',
    status: 'SUCCESS' as GetExecutionStatusResponse['status'],
    updatedAt: '2026-10-18T00:00:00Z',
    quoteResponse: {
        quoteRequest: {
            // Deposit 1's quoted recipient from the issue body:
            recipient:
                'b45e38628bce420c8ebbaf0d2c2c12ec9863c7a0a9a04386d704760c085605c6',
            recipientType: 'CONFIDENTIAL_INTENTS',
            // Rest of QuoteRequest omitted for brevity; the helper only reads `recipient`.
        },
        quote: {},
        timestamp: '2026-10-18T00:00:00Z',
        signature: 'ed25519:dummy-not-verified-by-this-helper',
    },
    swapDetails: {
        intentHashes: [],
        nearTxHashes: [
            // Deposit 1: executed with receiver_id 51e8f94d...de7cbe, API said SUCCESS
            '3djtQ3pUHv8SGtNKS3CMGice7E7S9oeS4DJzNYyjCUVD',
            // Deposit 2: same sink, same pattern
            'jNeJZQ4pa4p69LBiEvTDbTj2WmhCgiKRY2a2scA193j',
        ],
        originChainTxHashes: [],
        destinationChainTxHashes: [],
    },
    // Cast — this fixture omits optional fields the helper doesn't read.
} as unknown as GetExecutionStatusResponse;

async function main(): Promise<void> {
    const verdict = await verifyIntentDestination(STATUS_FROM_384, NEAR_MAINNET_RPC);

    if (verdict.ok) {
        console.log(`OK — verified ${verdict.verified} tx hash(es), all destinations matched the quote.`);
        process.exit(0);
    }

    console.log('MISMATCH detected — this is near/intents#384.');
    console.log(`  Quoted recipient: ${verdict.quoted}`);
    for (const m of verdict.mismatched) {
        console.log(`  Tx ${m.txHash}: actual receiver_id = ${m.actual}`);
    }
    console.log(`  Reason: ${verdict.reason}`);
    // Exit 0 so this example reads as "the helper works" rather than "the run failed."
    process.exit(0);
}

main().catch((err: unknown) => {
    console.error('verifyIntentDestination example failed:', err);
    process.exit(1);
});
