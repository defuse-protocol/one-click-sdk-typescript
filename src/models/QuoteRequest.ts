/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QuoteRequest = {
    /**
     * <p>Flag indicating whether this is a dry run request.</p>
     * <p>If <code>true</code>, the response will <strong>NOT</strong> contain the following fields:<ul>
     * <li><code>depositAddress</code></li>
     * <li><code>timeWhenInactive</code></li>
     * <li><code>timeEstimate</code></li>
     * <li><code>deadline</code></li>
     * </ul></p>
     */
    dry: boolean;
    /**
     * <p>Whether to use the amount as the output or the input for the basis of the swap:<ul>
     * <li><code>EXACT_INPUT</code> - request output amount for exact input.</li>
     * <li><code>EXACT_OUTPUT</code> - request output amount for exact output. The <code>refundTo</code> address will always receive excess tokens back even after the swap is complete.</li>
     * </ul></p>
     */
    swapType: QuoteRequest.swapType;
    /**
     * Slippage tolerance for the swap. This value is in basis points (1/100th of a percent), e.g. 100 for 1% slippage.
     */
    slippageTolerance: number;
    /**
     * ID of the origin asset.
     */
    originAsset: string;
    /**
     * <p>Type of the deposit address:<ul>
     * <li><code>ORIGIN_CHAIN</code> - deposit address on the origin chain</li>
     * <li><code>INTENTS</code> - <strong>account ID</strong> inside near intents to which you should transfer assets inside intents.</li>
     * </ul></p>
     */
    depositType: QuoteRequest.depositType;
    /**
     * ID of the destination asset.
     */
    destinationAsset: string;
    /**
     * Amount to swap as the base amount (can be switched to exact input/output using the dedicated flag), denoted in the smallest unit of the specified currency (e.g., wei for ETH).
     */
    amount: string;
    /**
     * Address for user refund.
     */
    refundTo: string;
    /**
     * <p>Type of refund address:<ul>
     * <li><code>ORIGIN_CHAIN</code> - assets will be refunded to <code>refundTo</code> address on the origin chain</li>
     * <li><code>INTENTS</code> - assets will be refunded to <code>refundTo</code> intents account</li>
     * </ul></p>
     */
    refundType: QuoteRequest.refundType;
    /**
     * Recipient address. The format should match <code>recipientType</code>.
     */
    recipient: string;
    /**
     * <p>Type of recipient address:<ul>
     * <li><code>DESTINATION_CHAIN</code> - assets will be transferred to chain of <code>destinationAsset</code></li>
     * <li><code>INTENTS</code> - assets will be transferred to account inside intents</li>
     * </ul></p>
     */
    recipientType: QuoteRequest.recipientType;
    /**
     * Timestamp in ISO format, that identifies when user refund will begin if the swap isn't completed by then.
     */
    deadline: string;
    /**
     * Referral identifier
     */
    referral?: string;
    /**
     * Time in milliseconds user is willing to wait for quote from relay.
     */
    quoteWaitingTimeMs?: number;
};
export namespace QuoteRequest {
    /**
     * <p>Whether to use the amount as the output or the input for the basis of the swap:<ul>
     * <li><code>EXACT_INPUT</code> - request output amount for exact input.</li>
     * <li><code>EXACT_OUTPUT</code> - request output amount for exact output. The <code>refundTo</code> address will always receive excess tokens back even after the swap is complete.</li>
     * </ul></p>
     */
    export enum swapType {
        EXACT_INPUT = 'EXACT_INPUT',
        EXACT_OUTPUT = 'EXACT_OUTPUT',
    }
    /**
     * <p>Type of the deposit address:<ul>
     * <li><code>ORIGIN_CHAIN</code> - deposit address on the origin chain</li>
     * <li><code>INTENTS</code> - <strong>account ID</strong> inside near intents to which you should transfer assets inside intents.</li>
     * </ul></p>
     */
    export enum depositType {
        ORIGIN_CHAIN = 'ORIGIN_CHAIN',
        INTENTS = 'INTENTS',
    }
    /**
     * <p>Type of refund address:<ul>
     * <li><code>ORIGIN_CHAIN</code> - assets will be refunded to <code>refundTo</code> address on the origin chain</li>
     * <li><code>INTENTS</code> - assets will be refunded to <code>refundTo</code> intents account</li>
     * </ul></p>
     */
    export enum refundType {
        ORIGIN_CHAIN = 'ORIGIN_CHAIN',
        INTENTS = 'INTENTS',
    }
    /**
     * <p>Type of recipient address:<ul>
     * <li><code>DESTINATION_CHAIN</code> - assets will be transferred to chain of <code>destinationAsset</code></li>
     * <li><code>INTENTS</code> - assets will be transferred to account inside intents</li>
     * </ul></p>
     */
    export enum recipientType {
        DESTINATION_CHAIN = 'DESTINATION_CHAIN',
        INTENTS = 'INTENTS',
    }
}

