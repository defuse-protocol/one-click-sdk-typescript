import { base58 } from '@scure/base';
import nacl from 'tweetnacl';
import { ONE_CLICK_MANAGER_PUB_KEY } from './constants';

const ED25519_PREFIX = 'ed25519:';

export interface VerifyDepositAddressSignatureResult {
  valid: boolean;
  error?: string;
}

function decodeEd25519Base58(value: string): Uint8Array {
  const encoded = value.startsWith(ED25519_PREFIX)
    ? value.slice(ED25519_PREFIX.length)
    : value;
  return base58.decode(encoded);
}

// so we can test internally with pure functional pattern
export function _verifyDepositAddressSignatureInternal(
  depositAddress: string,
  depositSignature: string,
  managerPublicKey: string,
): VerifyDepositAddressSignatureResult {
  try {
    const signatureBytes = decodeEd25519Base58(depositSignature);
    const publicKeyBytes = decodeEd25519Base58(managerPublicKey);
    const message = new TextEncoder().encode(depositAddress);

    return { valid: nacl.sign.detached.verify(message, signatureBytes, publicKeyBytes) };
  } catch (error) {
    return {
      valid: false,
      error: `Verification error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

export function verifyDepositAddressSignature(
  depositAddress: string,
  depositSignature: string,
): VerifyDepositAddressSignatureResult {
  return _verifyDepositAddressSignatureInternal(
    depositAddress,
    depositSignature,
    ONE_CLICK_MANAGER_PUB_KEY,
  );
}
