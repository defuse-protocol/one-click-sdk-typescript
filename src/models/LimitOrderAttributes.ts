/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppFee } from './AppFee';
import type { ConfidentialityLevelEnum } from './ConfidentialityLevelEnum';
import type { DepositModeEnum } from './DepositModeEnum';
import type { DepositTypeEnum } from './DepositTypeEnum';
import type { LimitOrderExactInputSwapView } from './LimitOrderExactInputSwapView';
import type { LimitOrderExactOutputSwapView } from './LimitOrderExactOutputSwapView';
import type { LimitOrderPartialFill } from './LimitOrderPartialFill';
import type { LimitOrderTypeEnum } from './LimitOrderTypeEnum';
import type { OrderFillStatusEnum } from './OrderFillStatusEnum';
import type { OrderPayouts } from './OrderPayouts';
import type { OrderPayoutStatusEnum } from './OrderPayoutStatusEnum';
import type { OrderSideEnum } from './OrderSideEnum';
import type { RecipientTypeEnum } from './RecipientTypeEnum';
import type { RefundTypeEnum } from './RefundTypeEnum';
import type { TimeInForceEnum } from './TimeInForceEnum';
export type LimitOrderAttributes = {
    /**
     * Order type.
     */
    orderType: LimitOrderTypeEnum;
    /**
     * Deposit address for funding the order.
     */
    depositAddress: string;
    /**
     * Memo to include with the deposit, when required.
     */
    depositMemo?: string;
    /**
     * Deposit address mode.
     */
    depositMode: DepositModeEnum;
    /**
     * Type of deposit address.
     */
    depositType: DepositTypeEnum;
    /**
     * Current fill status. This does not show whether payout funds arrived.
     */
    fillStatus: OrderFillStatusEnum;
    /**
     * Aggregated progress of the main withdrawal and refund.
     */
    payoutStatus: OrderPayoutStatusEnum;
    /**
     * Whether payoutStatus is COMPLETED or FAILED. This field is derived and has no additional meaning.
     */
    isPayoutStatusFinal: boolean;
    /**
     * Current withdrawal and refund legs.
     */
    payouts: OrderPayouts;
    /**
     * Cumulative deposited input amount in the smallest unit of the base asset for SELL or the quote asset for BUY.
     */
    depositedAmount: string;
    /**
     * Cumulative deposited input amount formatted using the input asset decimals.
     */
    depositedAmountFormatted: string;
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
     * Read-only swap representation derived from the order side and limit price.
     */
    swapView: (LimitOrderExactInputSwapView | LimitOrderExactOutputSwapView);
    /**
     * Submitted order side.
     */
    side: OrderSideEnum;
    /**
     * Submitted human-unit limit price.
     */
    price: string;
    /**
     * Normalized application and protocol fees.
     */
    appFees: Array<AppFee>;
    /**
     * Recipient address supplied when creating the order.
     */
    recipient: string;
    /**
     * Type of recipient address.
     */
    recipientType: RecipientTypeEnum;
    /**
     * Refund address supplied when creating the order.
     */
    refundTo: string;
    /**
     * Type of refund address.
     */
    refundType: RefundTypeEnum;
    /**
     * Withdrawal-fee estimate captured at creation, in destination-asset smallest units. It covers one withdrawal. The fee charged for each withdrawal may differ.
     */
    estimatedWithdrawFee: string;
    /**
     * Withdrawal-fee estimate formatted using the destination asset decimals.
     */
    estimatedWithdrawFeeFormatted: string;
    /**
     * Refund-fee estimate captured at creation, in input-asset smallest units. The fee charged for the refund may differ.
     */
    estimatedRefundFee: string;
    /**
     * Refund-fee estimate formatted using the input asset decimals.
     */
    estimatedRefundFeeFormatted: string;
    /**
     * Confidentiality mode for this order.
     */
    confidentiality: ConfidentialityLevelEnum;
    /**
     * Time in force for the order.
     */
    timeInForce: TimeInForceEnum;
    /**
     * Timestamp in ISO format that identifies when the order can expire.
     */
    deadline: string;
    /**
     * Timestamp in ISO format that identifies when the order was created.
     */
    createdAt: string;
    /**
     * Successful fills. Fills that are in flight or failed are not reported.
     */
    partialFills?: Array<LimitOrderPartialFill>;
};

