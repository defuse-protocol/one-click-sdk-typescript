const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const quoteSignatureTemplate = path.join(__dirname, 'templates', 'quoteSignature.ts');
const quoteSignatureTarget = path.join(repoRoot, 'src', 'quoteSignature.ts');
const servicePath = path.join(repoRoot, 'src', 'services', 'OneClickService.ts');
const indexPath = path.join(repoRoot, 'src', 'index.ts');

const replaceOrThrow = (source, search, replacement, description) => {
  if (!source.includes(search)) {
    throw new Error(`Unable to apply 1Click SDK customization: ${description}`);
  }
  return source.replace(search, replacement);
};

fs.mkdirSync(path.dirname(quoteSignatureTarget), { recursive: true });
fs.copyFileSync(quoteSignatureTemplate, quoteSignatureTarget);

let service = fs.readFileSync(servicePath, 'utf8');
if (!service.includes("../quoteSignature")) {
  service = replaceOrThrow(
    service,
    "import { request as __request } from '../core/request';\n",
    "import { request as __request } from '../core/request';\nimport { withQuoteSignatureVerification } from '../quoteSignature';\n",
    'could not find generated request import in OneClickService',
  );
}

if (!service.includes('return withQuoteSignatureVerification(__request(OpenAPI, {')) {
  service = replaceOrThrow(
    service,
    "        return __request(OpenAPI, {\n            method: 'POST',\n            url: '/v0/quote',",
    "        return withQuoteSignatureVerification(__request(OpenAPI, {\n            method: 'POST',\n            url: '/v0/quote',",
    'could not find generated getQuote request call',
  );
  const wrappedGetQuoteIndex = service.indexOf('return withQuoteSignatureVerification(__request(OpenAPI, {');
  const requestTerminatorIndex = service.indexOf("        });\n    }", wrappedGetQuoteIndex);
  if (requestTerminatorIndex === -1) {
    throw new Error('Unable to apply 1Click SDK customization: could not find generated getQuote request terminator');
  }
  service = service.slice(0, requestTerminatorIndex)
    + "        }));\n    }"
    + service.slice(requestTerminatorIndex + "        });\n    }".length);
}
fs.writeFileSync(servicePath, service);

let index = fs.readFileSync(indexPath, 'utf8');
const quoteSignatureExport = "export { QuoteSignatureVerificationError, getCanonicalQuoteHash, getCanonicalQuotePayload, verifyQuoteResponseOrThrow, verifyQuoteResponseSignature } from './quoteSignature';\n";
if (!index.includes(quoteSignatureExport)) {
  index = replaceOrThrow(
    index,
    "export type { OpenAPIConfig } from './core/OpenAPI';\n",
    "export type { OpenAPIConfig } from './core/OpenAPI';\n" + quoteSignatureExport,
    'could not find OpenAPIConfig export insertion point',
  );
}
fs.writeFileSync(indexPath, index);
