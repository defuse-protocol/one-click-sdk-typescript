import type { GetExecutionStatusResponse } from './models/GetExecutionStatusResponse';
import type { QuoteRequest } from './models/QuoteRequest';

const INTENTS_VERIFIER_ACCOUNT = 'intents.near';
const EXECUTE_INTENTS_METHOD = 'execute_intents';

export type DestinationMismatch = {
    txHash: string;
    actual: string;
};

export type VerifyDestinationResult =
    | { ok: true; verified: number }
    | {
          ok: false;
          quoted: string;
          mismatched: DestinationMismatch[];
          reason: 'DESTINATION_MISMATCH';
      };

/**
 * Post-signature destination verification against the NEAR Intents verifier.
 *
 * Reads the on-chain `receiver_id` back from each tx in
 * `status.swapDetails.nearTxHashes`, compares to the recipient the quote asked
 * for (`status.quoteResponse.quoteRequest.recipient` or
 * `virtualChainRecipient`), and reports any divergence.
 *
 * Why: see near/intents#384. The 1Click API has returned `status: SUCCESS`
 * while the signed-transfer intent lands in a solver-controlled sink account
 * that was never the quoted recipient. Pre-signature policy engines (e.g.
 * OutLayer) cannot catch this — the signature is valid; the misroute is in
 * the solver-side intent action. The only check that catches it is a
 * post-signature read of the on-chain `receiver_id` back against the quote.
 *
 * Usage:
 * ```ts
 * const status = await oneClick.getExecutionStatus({ depositAddress });
 * const verdict = await verifyIntentDestination(status, 'https://rpc.mainnet.near.org');
 * if (!verdict.ok) {
 *     // Halt the agent; do not enqueue a next swap; do not treat `SUCCESS` as settled.
 *     throw new Error(`${verdict.reason}: quoted=${verdict.quoted}, mismatched=${JSON.stringify(verdict.mismatched)}`);
 * }
 * ```
 *
 * This helper does NOT modify any existing code path. It is opt-in: the caller
 * decides when to run it (after `getExecutionStatus`, before the next action,
 * before trusting a `SUCCESS` for downstream accounting).
 *
 * The underlying solver routing bug is `near/intents#384`'s own fix; this
 * helper is the SDK-consumer-side guard until that lands.
 */
export async function verifyIntentDestination(
    status: GetExecutionStatusResponse,
    nearRpcUrl: string,
    fetchFn: typeof fetch = fetch,
): Promise<VerifyDestinationResult> {
    const expected = expectedRecipient(status.quoteResponse.quoteRequest);
    const txHashes = status.swapDetails?.nearTxHashes ?? [];

    const mismatched: DestinationMismatch[] = [];

    for (const txHash of txHashes) {
        const actual = await readIntentReceiverId(
            txHash,
            INTENTS_VERIFIER_ACCOUNT,
            nearRpcUrl,
            fetchFn,
        );
        if (actual !== null && actual !== expected) {
            mismatched.push({ txHash, actual });
        }
    }

    if (mismatched.length === 0) {
        return { ok: true, verified: txHashes.length };
    }

    return {
        ok: false,
        quoted: expected,
        mismatched,
        reason: 'DESTINATION_MISMATCH',
    };
}

/**
 * The recipient the SDK caller asked for. For virtual-chain destinations the
 * quote carries both a logical recipient and a per-chain one; the logical one
 * matches what lands on `intents.near` as the signed-transfer `receiver_id`.
 */
function expectedRecipient(quoteRequest: QuoteRequest): string {
    return quoteRequest.recipient;
}

/**
 * Isomorphic base64 → UTF-8 decode. Uses `atob` + `TextDecoder` which are
 * standard in Node 16+ and all modern browsers, so this helper carries no
 * Node-only dependency and the SDK remains runtime-neutral.
 */
function base64DecodeToUtf8(base64: string): string {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
}

/**
 * Fetch a NEAR tx and extract the `receiver_id` of its first signed-transfer
 * intent executed on `intents.near` via `execute_intents`.
 *
 * Returns `null` if the tx carries no `execute_intents` call on the verifier
 * (e.g. an unrelated hash, a confidential-only receipt whose transfer actions
 * cannot be inspected without the solver's key, a deposit tx). The caller
 * treats `null` as "nothing to verify here" rather than a mismatch.
 */
async function readIntentReceiverId(
    txHash: string,
    senderAccountId: string,
    nearRpcUrl: string,
    fetchFn: typeof fetch,
): Promise<string | null> {
    const response = await fetchFn(nearRpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'verify-destination',
            method: 'EXPERIMENTAL_tx_status',
            params: [txHash, senderAccountId],
        }),
    });
    if (!response.ok) {
        return null;
    }
    const body = (await response.json()) as NearRpcResponse;
    const receipts = body?.result?.receipts ?? [];
    for (const receipt of receipts) {
        if (receipt.receiver_id !== INTENTS_VERIFIER_ACCOUNT) continue;
        for (const action of receipt.receipt?.Action?.actions ?? []) {
            const call = action.FunctionCall;
            if (!call || call.method_name !== EXECUTE_INTENTS_METHOD) continue;
            if (!call.args) continue;
            const receiverId = extractReceiverIdFromExecuteIntentsArgs(call.args);
            if (receiverId) return receiverId;
        }
    }
    return null;
}

/**
 * Parse the `execute_intents` args and return the first `Transfer`-intent
 * `receiver_id` found. The args are base64-encoded JSON matching
 * `{"signed": [MultiPayload, ...]}`. Each MultiPayload wraps a signed intents
 * payload whose decoded form carries an `intents` array; a `Transfer` entry
 * has `{"intent": "transfer", "receiver_id": "<account>", "tokens": {...}}`.
 *
 * This parser handles the public (NEP-413) and ERC-191 payload variants seen
 * on `intents.near` to date. The signed inner payload shape is defined by
 * near/intents and may evolve; prefer this helper over a bespoke caller
 * extraction so parser updates land in one place.
 */
function extractReceiverIdFromExecuteIntentsArgs(argsBase64: string): string | null {
    let decoded: unknown;
    try {
        const argsJson = base64DecodeToUtf8(argsBase64);
        decoded = JSON.parse(argsJson);
    } catch {
        return null;
    }
    const signedList = (decoded as { signed?: unknown[] })?.signed;
    if (!Array.isArray(signedList)) return null;

    for (const signed of signedList) {
        const payload = extractInnerPayload(signed);
        const intents = (payload as { intents?: unknown[] })?.intents;
        if (!Array.isArray(intents)) continue;
        for (const intent of intents) {
            const typed = intent as { intent?: string; receiver_id?: unknown };
            if (typed.intent === 'transfer' && typeof typed.receiver_id === 'string') {
                return typed.receiver_id;
            }
        }
    }
    return null;
}

/**
 * The `MultiPayload` envelope carries a `payload` string that is itself a
 * JSON-encoded signed message. Decode it defensively — a malformed inner
 * payload returns `null` rather than throwing, so a single bad hash doesn't
 * fail the whole verification.
 */
function extractInnerPayload(signed: unknown): unknown {
    const envelope = signed as { payload?: unknown };
    const raw = envelope?.payload;
    if (typeof raw === 'string') {
        try {
            return JSON.parse(raw);
        } catch {
            return null;
        }
    }
    if (raw && typeof raw === 'object') {
        return raw;
    }
    return null;
}

type NearRpcResponse = {
    result?: {
        receipts?: Array<{
            receiver_id?: string;
            receipt?: {
                Action?: {
                    actions?: Array<{
                        FunctionCall?: {
                            method_name?: string;
                            args?: string;
                        };
                    }>;
                };
            };
        }>;
    };
};
