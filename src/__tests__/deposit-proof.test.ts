import { describe, it, expect } from 'vitest';
import { verifyDepositAddressSignature, _verifyDepositAddressSignatureInternal } from '../deposit-proof';

// Staging public keyfrom solver stage
const STAGING_MANAGER_PUB_KEY = 'ed25519:5J5tkaxyPoR3Q9S8LXfo5bWnXK5Z2bctJ4mB9gENh7co';

const TEST_DEPOSIT_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f8fE21';
const SIGNED_DEPOSIT_ADDRESS = '0x50524C008A698BA8ca1A410BdEfa7B86fcC6034d';

const REAL_DEPOPSIT_SIGNATURE = 'ed25519:mEQyZgfXvVf2e8c9fFgVf243R4qhUtZiRTdJKctwAbDu7ozW7LeGJHmue9me3STEqCWchmGbRcnpgrSZhMPMGkt';
const FAKE_DEPOPSIT_SIGNATURE = 'ed25519:5fVqoCrPgqS9WPqnX5xvHKNYBqRZPkXvEqM9VaHZXgBbPYp7qZzx5HkNvZxQK1hBkD2qT8GJfXwR9nL4mS6vYt2';


describe('verifyDepositAddressSignature', () => {
  describe('with invalid signatures', () => {
    it('should reject an empty signature', () => {
      const result = verifyDepositAddressSignature(TEST_DEPOSIT_ADDRESS, '');
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should reject a malformed signature', () => {
      const malformedSignature = 'not-a-valid-signature';
      const result = verifyDepositAddressSignature(TEST_DEPOSIT_ADDRESS, malformedSignature);
      expect(result.valid).toBe(false);
    });

    it('should reject a signature not signed by the manager key', () => {
      //valid ed25519 signature formaaat but not signed by manager
      const result = verifyDepositAddressSignature(TEST_DEPOSIT_ADDRESS, FAKE_DEPOPSIT_SIGNATURE);
      expect(result.valid).toBe(false);
    });
  });

  describe('Real deposit address verification (Staging)', () => {
    it('should verify real EVM deposit address and signature from staging', () => {
      const result = _verifyDepositAddressSignatureInternal(
        SIGNED_DEPOSIT_ADDRESS,
        REAL_DEPOPSIT_SIGNATURE,
        STAGING_MANAGER_PUB_KEY,
      );
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  
    it('should reject if deposit address is tampered (MITM simulation)', () => {
      const result = _verifyDepositAddressSignatureInternal(
        TEST_DEPOSIT_ADDRESS,
        REAL_DEPOPSIT_SIGNATURE,
        STAGING_MANAGER_PUB_KEY,
      );
      expect(result.valid).toBe(false);
    });
  });
});
