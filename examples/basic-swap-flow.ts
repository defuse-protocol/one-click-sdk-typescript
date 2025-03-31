import {
	OneClickService,
	OpenAPI,
	QuoteRequest,
	TokenResponse,
} from "@defuse-protocol/one-click-sdk-typescript";

// Configure the SDK
OpenAPI.BASE = "https://1click.chaindefuser.com"; // API endpoint from OpenAPI spec

async function demonstrateSwapFlow() {
	try {
		// 1. Get available tokens
		console.log("Fetching available tokens...");
		const tokens = await OneClickService.getTokens();
		console.log(
			"Available tokens:",
			tokens.map((t: TokenResponse) => `${t.symbol} (${t.blockchain})`),
		);

		// 2. Request a quote
		console.log("\nRequesting quote...");
		const quoteRequest: QuoteRequest = {
			dry: true,
			swapType: QuoteRequest.swapType.EXACT_INPUT,
			slippageTolerance: 100, // 1%
			originAsset:
				"nep141:arb-0xaf88d065e77c8cc2239327c5edb3a432268e5831.omft.near",
			depositType: QuoteRequest.depositType.ORIGIN_CHAIN,
			destinationAsset:
				"nep141:sol-5ce3bf3a31af18be40ba30f721101b4341690186.omft.near",
			amount: "1000",
			refundTo: "0x2527D02599Ba641c19FEa793cD0F167589a0f10D",
			refundType: QuoteRequest.refundType.ORIGIN_CHAIN,
			recipient: "13QkxhNMrTPxoCkRdYdJ65tFuwXPhL5gLS2Z5Nr6gjRK",
			recipientType: QuoteRequest.recipientType.DESTINATION_CHAIN,
			deadline: "2019-08-24T14:15:22Z",
			referral: "referral",
			quoteWaitingTimeMs: 3000,
		};

		const quote = await OneClickService.getQuote(quoteRequest);

		console.log("getQuote RESPONSE:", quote);

		// 3. Submit deposit transaction (in real scenario, this would be after user sends the transaction)
		// console.log("\nSubmitting deposit transaction...");
		// const depositTxRequest = {
		// 	depositAddress: quote.quote.depositAddress, // Safe to use after null check
		// 	txHash: "0x123...", // Replace with actual transaction hash
		// };
		//
		// const depositSubmission =
		// 	await OneClickService.submitDepositTx(depositTxRequest);
		// console.log("Deposit submission result:", depositSubmission);

		// // 4. Check execution status
		// console.log("\nChecking execution status...");
		// const status = await OneClickService.getExecutionStatus(
		// 	quote.quote.depositAddress,
		// ); // Safe to use after null check
		// console.log("Current status:", status);
	} catch (error) {
		console.error("Error in swap flow:", error);
	}
}

// Run the demonstration
demonstrateSwapFlow().catch(console.error);
