const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const quoteSignatureTemplate = path.join(__dirname, 'templates', 'quoteSignature.ts');
const quoteSignatureTarget = path.join(repoRoot, 'src', 'quoteSignature.ts');
const servicePath = path.join(repoRoot, 'src', 'services', 'OneClickService.ts');
const indexPath = path.join(repoRoot, 'src', 'index.ts');

fs.mkdirSync(path.dirname(quoteSignatureTarget), { recursive: true });
fs.copyFileSync(quoteSignatureTemplate, quoteSignatureTarget);

let service = fs.readFileSync(servicePath, 'utf8');
if (!service.includes("../quoteSignature")) {
  service = service.replace(
    "import { request as __request } from '../core/request';\n",
    "import { request as __request } from '../core/request';\nimport { withQuoteSignatureVerification } from '../quoteSignature';\n",
  );
}

const getQuoteReturn = "        return __request(OpenAPI, {\n            method: 'POST',\n            url: '/v0/quote',";
if (service.includes(getQuoteReturn) && !service.includes('return withQuoteSignatureVerification(__request(OpenAPI, {')) {
  service = service.replace(getQuoteReturn, "        return withQuoteSignatureVerification(__request(OpenAPI, {\n            method: 'POST',\n            url: '/v0/quote',");
  service = service.replace(
    "            },\n        });\n    }\n    /**\n     * Check swap execution status",
    "            },\n        }));\n    }\n    /**\n     * Check swap execution status",
  );
}
fs.writeFileSync(servicePath, service);

let index = fs.readFileSync(indexPath, 'utf8');
const quoteSignatureExport = "export { QuoteSignatureVerificationError, getCanonicalQuoteHash, getCanonicalQuotePayload, verifyQuoteResponseOrThrow, verifyQuoteResponseSignature } from './quoteSignature';\n";
if (!index.includes("from './quoteSignature'")) {
  index = index.replace("export type { OpenAPIConfig } from './core/OpenAPI';\n", "export type { OpenAPIConfig } from './core/OpenAPI';\n" + quoteSignatureExport);
}
fs.writeFileSync(indexPath, index);
