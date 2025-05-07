# One Click SDK Examples

This directory contains example implementations using the @defuse-protocol/one-click-sdk-typescript package.

## Examples

1. `basic-swap-flow.ts` - Demonstrates a complete swap flow:
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

## Important Notes

- The examples use placeholder values for addresses and transaction hashes
- The SDK is configured to use the API endpoint: `https://1click.chaindefuser.com`
- In a production environment, you should handle errors appropriately
- Always validate input parameters in your actual implementation

## Additional Resources

- [SDK Documentation](https://github.com/defuse-protocol/one-click-sdk-typescript)
- [API Documentation](https://1click.chaindefuser.com/docs) 