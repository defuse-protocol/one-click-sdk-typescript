const assert = require('assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const nacl = require('tweetnacl');
const ts = require('typescript');

const repoRoot = path.resolve(__dirname, '..');
const base58Alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const textEncoder = new TextEncoder();

const encodeBase58 = (input) => {
  const digits = [0];

  for (const byte of input) {
    let carry = byte;
    for (let i = 0; i < digits.length; i += 1) {
      carry += digits[i] << 8;
      digits[i] = carry % 58;
      carry = Math.floor(carry / 58);
    }

    while (carry > 0) {
      digits.push(carry % 58);
      carry = Math.floor(carry / 58);
    }
  }

  for (const byte of input) {
    if (byte !== 0) break;
    digits.push(0);
  }

  return digits.reverse().map((digit) => base58Alphabet[digit]).join('');
};

const transpileGeneratedClient = (srcRoot, distRoot) => {
  for (const entry of fs.readdirSync(srcRoot, { withFileTypes: true })) {
    const sourcePath = path.join(srcRoot, entry.name);
    const outputPath = path.join(distRoot, entry.name);

    if (entry.isDirectory()) {
      transpileGeneratedClient(sourcePath, outputPath);
      continue;
    }

    if (!entry.name.endsWith('.ts')) {
      continue;
    }

    const output = ts.transpileModule(fs.readFileSync(sourcePath, 'utf8'), {
      compilerOptions: {
        esModuleInterop: true,
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    });

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath.replace(/\.ts$/, '.js'), output.outputText);
  }
};

const generateCustomizedClient = (tempRoot, publicKey) => {
  fs.cpSync(path.join(repoRoot, 'scripts'), path.join(tempRoot, 'scripts'), { recursive: true });
  execFileSync(
    'pnpm',
    [
      'exec',
      'openapi',
      '--input',
      path.join(repoRoot, 'test/fixtures/openapi.quote.yaml'),
      '--output',
      path.join(tempRoot, 'src'),
      '--client',
      'axios',
    ],
    { cwd: repoRoot, stdio: 'inherit' },
  );
  execFileSync(process.execPath, [path.join(tempRoot, 'scripts/apply-customizations.cjs')], { stdio: 'inherit' });

  const quoteSignaturePath = path.join(tempRoot, 'src/quoteSignature.ts');
  fs.writeFileSync(
    quoteSignaturePath,
    fs.readFileSync(quoteSignaturePath, 'utf8').replace(
      'ed25519:reYaWhvwu8Jzo3WUM3zhn6VrhuMEF4eADL17qtRVifc',
      publicKey,
    ),
  );
};

const createQuoteResponse = () => ({
  correlationId: 'correlation-id',
  timestamp: '2026-06-01T00:00:00.000Z',
  signature: '',
  quoteRequest: {
    dry: false,
    swapType: 'EXACT_INPUT',
    slippageTolerance: 100,
    originAsset: 'nep141:origin.test',
    depositType: 'ORIGIN_CHAIN',
    destinationAsset: 'nep141:destination.test',
    amount: '1000000',
    refundTo: 'refund-address',
    refundType: 'ORIGIN_CHAIN',
    recipient: 'recipient-address',
    recipientType: 'DESTINATION_CHAIN',
    deadline: '2026-06-01T01:00:00.000Z',
  },
  quote: {
    depositAddress: 'deposit-address',
    amountIn: '1000000',
    amountInFormatted: '1',
    amountInUsd: '1.00',
    minAmountIn: '1000000',
    amountOut: '990000',
    amountOutFormatted: '0.99',
    amountOutUsd: '0.99',
    minAmountOut: '980000',
    timeEstimate: 60,
  },
});

const assertGeneratedQuoteClientVerifiesSignatures = async () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'one-click-sdk-generation-'));

  try {
    const keyPair = nacl.sign.keyPair();
    const publicKey = `ed25519:${encodeBase58(keyPair.publicKey)}`;
    fs.symlinkSync(path.join(repoRoot, 'node_modules'), path.join(tempRoot, 'node_modules'), 'dir');
    generateCustomizedClient(tempRoot, publicKey);

    const service = fs.readFileSync(path.join(tempRoot, 'src/services/OneClickService.ts'), 'utf8');
    assert.match(service, /import \{ withQuoteSignatureVerification \} from '\.\.\/quoteSignature';/);
    assert.match(service, /return withQuoteSignatureVerification\(__request\(OpenAPI, \{/);

    transpileGeneratedClient(path.join(tempRoot, 'src'), path.join(tempRoot, 'dist'));

    const { getCanonicalQuoteHash, QuoteSignatureVerificationError } = require(path.join(tempRoot, 'dist/quoteSignature.js'));
    const { OneClickService } = require(path.join(tempRoot, 'dist/services/OneClickService.js'));
    const axios = require('axios');
    const originalRequest = axios.request;
    const quoteResponse = createQuoteResponse();
    quoteResponse.signature = `ed25519:${encodeBase58(
      nacl.sign.detached(textEncoder.encode(getCanonicalQuoteHash(quoteResponse)), keyPair.secretKey),
    )}`;

    try {
      axios.request = async () => ({
        data: quoteResponse,
        headers: {},
        status: 200,
        statusText: 'OK',
      });
      assert.deepEqual(await OneClickService.getQuote(quoteResponse.quoteRequest), quoteResponse);

      axios.request = async () => ({
        data: {
          ...quoteResponse,
          quote: {
            ...quoteResponse.quote,
            amountOut: '1',
          },
        },
        headers: {},
        status: 200,
        statusText: 'OK',
      });
      await assert.rejects(
        () => OneClickService.getQuote(quoteResponse.quoteRequest),
        QuoteSignatureVerificationError,
      );
    } finally {
      axios.request = originalRequest;
    }
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
};

assertGeneratedQuoteClientVerifiesSignatures()
  .then(() => console.log('API client generation and quote verification e2e test passed'))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
