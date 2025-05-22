# One Click SDK Examples

This directory contains example implementations using the @defuse-protocol/one-click-sdk-typescript package.

## Examples

1. `basic-swap-flow.ts` - Demonstrates a complete swap flow with JWT authentication:
   - Authentication with JWT token
   - Fetching available tokens
   - Getting a quote
   - Submitting a deposit transaction
   - Checking execution status

## Prerequisites

- Node.js >= 16
- pnpm >= 8

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Run the example:
```bash
pnpm start:swap
```

## JWT Authentication

The 1Click API requires JWT authentication for most endpoints. Here's how to configure it:

### Static Token (Required)

```typescript
// Set a static JWT token - required for authenticated endpoints
const JWT_TOKEN = "YOUR_JWT_TOKEN";
OpenAPI.TOKEN = JWT_TOKEN;
```

### Dynamic Token Provider (for token refresh)

```typescript
// Set a function that returns a fresh token when needed
OpenAPI.TOKEN = async () => {
  // Get a fresh token from your authentication system
  return "FRESH_JWT_TOKEN";
};
```

### Protected Endpoints

The following endpoints require JWT authentication:
- `OneClickService.getQuote()`
- `OneClickService.submitDepositTx()`
- `OneClickService.getExecutionStatus()`

## Important Notes

- The examples use placeholder values for addresses and transaction hashes
- You must replace `YOUR_JWT_TOKEN` with a valid JWT token before running the examples
- The SDK is configured to use the API endpoint: `https://1click.chaindefuser.com`
- In a production environment, you should handle errors appropriately
- Always validate input parameters in your actual implementation

## Additional Resources

- [SDK Documentation](https://github.com/defuse-protocol/one-click-sdk-typescript)
- [API Documentation](https://1click.chaindefuser.com/docs) 