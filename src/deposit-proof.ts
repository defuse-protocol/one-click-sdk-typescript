import { base58 } from '@scure/base';
import nacl from 'tweetnacl';

const ED25519_PREFIX = 'ed25519:';

export type DepositProofType = 'INTENTS_ED25519' | 'BRIDGE_ECDSA';

export interface DepositProof {
    type: DepositProofType;
    signature: string;
    signedPayload: string;
    signerPublicKey: string;
    chainId?: string;
    version: number;
}

export interface VerifyDepositProofResult {
    valid: boolean;
    error?: string;
    details?: {
        proofType: DepositProofType;
        signerVerified: boolean;
        payloadVerified: boolean;
    };
}

export interface VerifyDepositProofOptions {
    bridgeAttestationPubkey?: string;
}

function decodeEd25519Base58(value: string): Uint8Array {
    const encoded = value.startsWith(ED25519_PREFIX)
        ? value.slice(ED25519_PREFIX.length)
        : value;
    return base58.decode(encoded);
}

function hexToBytes(hex: string): Uint8Array {
    const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
        bytes[i / 2] = parseInt(cleanHex.slice(i, i + 2), 16);
    }
    return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

function verifyIntentsProof(
    proof: DepositProof,
    depositAddress: string,
    quoteHash: string,
): VerifyDepositProofResult {
    try {
        const signatureBytes = decodeEd25519Base58(proof.signature);
        const signerPubkeyBytes = decodeEd25519Base58(proof.signerPublicKey);

        const depositAddressBytes = hexToBytes(depositAddress);
        const signerHex = bytesToHex(signerPubkeyBytes);
        const depositHex = bytesToHex(depositAddressBytes);

        const signerVerified =
            signerHex.toLowerCase() === depositHex.toLowerCase();

        if (!signerVerified) {
            return {
                valid: false,
                error: `Signer public key does not match deposit address. Expected ${depositHex}, got ${signerHex}`,
                details: {
                    proofType: 'INTENTS_ED25519',
                    signerVerified: false,
                    payloadVerified: false,
                },
            };
        }

        if (proof.signedPayload !== quoteHash) {
            return {
                valid: false,
                error: `Signed payload does not match quote hash. Expected ${quoteHash}, got ${proof.signedPayload}`,
                details: {
                    proofType: 'INTENTS_ED25519',
                    signerVerified: true,
                    payloadVerified: false,
                },
            };
        }

        const message = new TextEncoder().encode(quoteHash);
        const payloadVerified = nacl.sign.detached.verify(
            message,
            signatureBytes,
            signerPubkeyBytes,
        );

        if (!payloadVerified) {
            return {
                valid: false,
                error: 'Signature verification failed',
                details: {
                    proofType: 'INTENTS_ED25519',
                    signerVerified: true,
                    payloadVerified: false,
                },
            };
        }

        return {
            valid: true,
            details: {
                proofType: 'INTENTS_ED25519',
                signerVerified: true,
                payloadVerified: true,
            },
        };
    } catch (e) {
        return {
            valid: false,
            error: `Verification error: ${e instanceof Error ? e.message : String(e)}`,
        };
    }
}

function verifyBridgeProof(
    _proof: DepositProof,
    _depositAddress: string,
    _quoteHash: string,
    _options?: VerifyDepositProofOptions,
): VerifyDepositProofResult {
    return {
        valid: false,
        error: 'BRIDGE_ECDSA proof verification not yet implemented',
    };
}

/**
 * Verifies a deposit proof that binds a deposit address to a quote hash.
 *
 * For INTENTS deposits (depositType === 'INTENTS'), this provides trustless
 * verification because the deposit address IS the ed25519 public key.
 *
 * For non-INTENTS deposits, verification requires trusting the bridge
 * attestation key.
 *
 * @param proof - The deposit proof from the quote response
 * @param depositAddress - The deposit address from quote.depositAddress
 * @param quoteHash - The quote hash (use quoteHash(response) from quote-signature.ts)
 * @param options - Optional configuration (e.g., custom bridge attestation key)
 * @returns Verification result with details
 *
 * @example
 * ```typescript
 * import { verifyDepositProof, quoteHash } from '@defuse-protocol/one-click-sdk-typescript';
 *
 * const result = verifyDepositProof(
 *   response.depositProof,
 *   response.quote.depositAddress,
 *   quoteHash(response)
 * );
 *
 * if (!result.valid) {
 *   throw new Error(`Deposit verification failed: ${result.error}`);
 * }
 * ```
 */
export function verifyDepositProof(
    proof: DepositProof,
    depositAddress: string,
    quoteHash: string,
    options?: VerifyDepositProofOptions,
): VerifyDepositProofResult {
    if (!proof) {
        return {
            valid: false,
            error: 'No deposit proof provided',
        };
    }

    if (!depositAddress) {
        return {
            valid: false,
            error: 'No deposit address provided',
        };
    }

    if (!quoteHash) {
        return {
            valid: false,
            error: 'No quote hash provided',
        };
    }

    switch (proof.type) {
        case 'INTENTS_ED25519':
            return verifyIntentsProof(proof, depositAddress, quoteHash);
        case 'BRIDGE_ECDSA':
            return verifyBridgeProof(proof, depositAddress, quoteHash, options);
        default:
            return {
                valid: false,
                error: `Unknown proof type: ${proof.type}`,
            };
    }
}
