/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppFee } from './AppFee';
import type { ConfidentialityLevelEnum } from './ConfidentialityLevelEnum';
import type { DepositModeEnum } from './DepositModeEnum';
import type { DepositTypeEnum } from './DepositTypeEnum';
import type { LimitOrderTypeEnum } from './LimitOrderTypeEnum';
import type { OrderSideEnum } from './OrderSideEnum';
import type { RecipientTypeEnum } from './RecipientTypeEnum';
import type { RefundTypeEnum } from './RefundTypeEnum';
import type { TimeInForceEnum } from './TimeInForceEnum';
export type LimitOrderCreateRequest = {
    /**
     * Order type.
     */
    orderType: LimitOrderTypeEnum;
    /**
     * ID of the base asset in the trading pair.
     */
    baseAsset: string;
    /**
     * ID of the quote asset used to price the base asset.
     */
    quoteAsset: string;
    /**
     * Base-asset order quantity in the asset smallest unit. A BUY targets this output; a SELL targets this input.
     */
    quantity: string;
    /**
     * Order side. SELL spends the base asset; BUY spends the quote asset.
     */
    side: OrderSideEnum;
    /**
     * Positive human-unit limit price expressed as quote asset units per one base asset
     */
    price: string;
    /**
     * ORIGIN_CHAIN returns a chain address; INTENTS and CONFIDENTIAL_INTENTS use the generate-intent and submit-intent flow.
     */
    depositType: DepositTypeEnum;
    /**
     * Address used for refunds.
     */
    refundTo: string;
    /**
     * Type of refund address.
     */
    refundType: RefundTypeEnum;
    /**
     * Address or Intents account that receives successfully filled output.
     */
    recipient: string;
    /**
     * Type of recipient address.
     */
    recipientType: RecipientTypeEnum;
    /**
     * Timestamp in ISO format that identifies when the order can expire.
     */
    deadline?: string;
    /**
     * Deposit address mode.
     */
    depositMode?: DepositModeEnum;
    /**
     * Confidentiality mode. Required for orders.
     */
    confidentiality: ConfidentialityLevelEnum;
    /**
     * Time in force for the order.
     */
    timeInForce?: TimeInForceEnum;
    /**
     * Application fees included in the submitted limit price and deducted from input.
     */
    appFees?: Array<AppFee>;
};

