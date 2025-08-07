# One Click SDK - TypeScript

A powerful TypeScript SDK for seamless cross-chain token swaps using the [1Click API](https://docs.near-intents.org/near-intents/integration/distribution-channels/1click-api). Built with type safety in mind, this SDK enables developers to easily integrate cross-chain swapping functionality into their applications with minimal setup.

## Prerequisites

- Node.js >= 16
- pnpm >= 8 _([For SDK Developers not users](#for-developers))_

## Installation

```bash
# Using npm
npm install @defuse-protocol/one-click-sdk-typescript

# Using yarn
yarn add @defuse-protocol/one-click-sdk-typescript

# Using pnpm
pnpm add @defuse-protocol/one-click-sdk-typescript
```

## Quick Start

```ts
import { OpenAPI, QuoteRequest, OneClickService } from '@defuse-protocol/one-click-sdk-typescript';

// Initialize the API client
OpenAPI.BASE = 'https://1click.chaindefuser.com';

// Configure your JSON Web Token (JWT) - required for most endpoints
// Request one here:
// https://docs.google.com/forms/d/e/1FAIpQLSdrSrqSkKOMb_a8XhwF0f7N5xZ0Y5CYgyzxiAuoC2g4a2N68g/viewform
OpenAPI.TOKEN = "your-JSON-Web-Token";

// Create a quote request
// See docs for more info:
// https://docs.near-intents.org/near-intents/integration/distribution-channels/1click-api#post-v0-quote
const quoteRequest: QuoteRequest = {
    dry: true, // set to true for testing / false to get `depositAddress` and execute swap
    swapType: QuoteRequest.swapType.EXACT_INPUT,
    slippageTolerance: 100, // 1%
    originAsset: 'nep141:arb-0xaf88d065e77c8cc2239327c5edb3a432268e5831.omft.near', // USDC on Arbitrum
    depositType: QuoteRequest.depositType.ORIGIN_CHAIN,
    destinationAsset: 'nep141:sol-5ce3bf3a31af18be40ba30f721101b4341690186.omft.near', // USDC on Solana
    amount: '1000000', // 1 USDC (in smallest units)
    refundTo: '0x2527D02599Ba641c19FEa793cD0F167589a0f10D', // Valid Arbitrum address
    refundType: QuoteRequest.refundType.ORIGIN_CHAIN, 
    recipient: '13QkxhNMrTPxoCkRdYdJ65tFuwXPhL5gLS2Z5Nr6gjRK', // Valid Solana Address
    recipientType: QuoteRequest.recipientType.DESTINATION_CHAIN,
    deadline: "2025-08-06T14:15:22Z"
};

// Get quote
const quote = await OneClickService.getQuote(quoteRequest);
```

## API Methods

[See official API docs](https://docs.near-intents.org/near-intents/integration/distribution-channels/1click-api) for more info on endpoints.

### Get Quote

```typescript
const quote = await OneClickService.getQuote(quoteRequest);
```

### Get Execution Status
```typescript
const status = await OneClickService.getExecutionStatus(depositAddress);
```

### Submit Deposit Transaction
```typescript
const result = await OneClickService.submitDepositTx({
    txHash: '0x...',
    depositAddress: '0x...'
});
```

## Authentication

The 1Click API requires JWT authentication for most endpoints -> [Request yours here](https://docs.google.com/forms/d/e/1FAIpQLSdrSrqSkKOMb_a8XhwF0f7N5xZ0Y5CYgyzxiAuoC2g4a2N68g/viewform) 

### Static Token (Required)

```typescript
// Set a static JWT - required for authenticated endpoints
OpenAPI.TOKEN = 'your-JSON-Web-Token';
```

### Dynamic Token Provider (for token refresh)

```typescript
// Set a function that returns a fresh token when needed
OpenAPI.TOKEN = async () => {
  // Get a fresh token from your authentication system
  return 'FRESH_JWT';
};
```

### Protected Endpoints

The following endpoints require JWT authentication:
- `OneClickService.getQuote()`
- `OneClickService.submitDepositTx()`
- `OneClickService.getExecutionStatus()`

## Error Handling

The SDK throws typed errors that you can catch and handle:

```typescript
try {
    const quote = await OneClickService.getQuote(quoteRequest);
} catch (error) {
    if (error instanceof ApiError && error.status === 401) {
        // Handle authentication errors
        console.error('Authentication failed: JWT is missing or invalid');
    } else if (error instanceof ApiError && error.status === 400) {
        // Handle bad request
        console.error('Invalid request:', error.body);
    } else {
        // Handle other errors
        console.error('Error:', error);
    }
}
```

## License

ISC - See [LICENSE](./LICENSE) for details.

## For Developers

For SDK developers (not SDK users), here are the development commands:

```bash
# Install dependencies
pnpm install

# Generate fresh SDK from latest API spec
pnpm generate:fresh

# Build the SDK
pnpm build

# Clean build artifacts
pnpm clean
``` 
