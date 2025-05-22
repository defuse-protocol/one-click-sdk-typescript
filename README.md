# @chaindefuser/one-click-typescript-sdk

A TypeScript SDK for interacting with the 1Click API. This SDK provides a type-safe way to interact with the 1Click API for cross-chain token swaps.

## Prerequisites

- Node.js >= 16
- pnpm >= 8

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

```typescript
import { OneClickService, OpenAPI, QuoteRequestDto } from '@defuse-protocol/one-click-sdk-typescript';

// Initialize the API client
OpenAPI.BASE = 'https://1click.chaindefuser.com';

// Configure JWT authentication (required for most endpoints)
const JWT_TOKEN = 'YOUR_JWT_TOKEN';
OpenAPI.TOKEN = JWT_TOKEN;

// Create a quote request
const quoteRequest: QuoteRequestDto = {
    dry: true,
    swapType: QuoteRequestDto.swapType.EXACT_INPUT,
    slippageTolerance: 100, // 1%
    originAsset: 'nep141:arb-0xaf88d065e77c8cc2239327c5edb3a432268e5831.omft.near',
    depositType: QuoteRequestDto.depositType.ORIGIN_CHAIN,
    destinationAsset: 'nep141:sol-5ce3bf3a31af18be40ba30f721101b4341690186.omft.near',
    amount: '1000',
    refundTo: '0x2527D02599Ba641c19FEa793cD0F167589a0f10D',
    refundType: QuoteRequestDto.refundType.ORIGIN_CHAIN,
    recipient: '13QkxhNMrTPxoCkRdYdJ65tFuwXPhL5gLS2Z5Nr6gjRK',
    recipientType: QuoteRequestDto.recipientType.DESTINATION_CHAIN
};

// Get quote
const quote = await OneClickService.oneClickControllerGetQuote(quoteRequest);
```

## API Methods

### Get Quote
```typescript
const quote = await OneClickService.oneClickControllerGetQuote(quoteRequest);
```

### Get Execution Status
```typescript
const status = await OneClickService.oneClickControllerGetExecutionStatus(depositAddress);
```

### Submit Deposit Transaction
```typescript
const result = await OneClickService.oneClickControllerSubmitDepositTx({
    txHash: '0x...',
    depositAddress: '0x...'
});
```

## Authentication

The 1Click API requires JWT authentication for most endpoints. You must configure authentication as follows:

### Static Token (Required)

```typescript
// Set a static JWT token - required for authenticated endpoints
const JWT_TOKEN = 'YOUR_JWT_TOKEN';
OpenAPI.TOKEN = JWT_TOKEN;
```

### Dynamic Token Provider (for token refresh)

```typescript
// Set a function that returns a fresh token when needed
OpenAPI.TOKEN = async () => {
  // Get a fresh token from your authentication system
  return 'FRESH_JWT_TOKEN';
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
    const quote = await OneClickService.oneClickControllerGetQuote(quoteRequest);
} catch (error) {
    if (error instanceof ApiError && error.status === 401) {
        // Handle authentication errors
        console.error('Authentication failed: JWT token is missing or invalid');
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
