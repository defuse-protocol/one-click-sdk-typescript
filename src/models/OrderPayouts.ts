/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderPayoutCompleted } from './OrderPayoutCompleted';
import type { OrderPayoutInProgress } from './OrderPayoutInProgress';
import type { PayoutFailed } from './PayoutFailed';
export type OrderPayouts = {
    /**
     * Latest successful withdrawal, or current withdrawal when none succeeded.
     */
    withdrawal: (OrderPayoutInProgress | OrderPayoutCompleted | PayoutFailed) | null;
    /**
     * All successful withdrawals, ordered from oldest to newest.
     */
    allWithdrawals: Array<(OrderPayoutInProgress | OrderPayoutCompleted | PayoutFailed)>;
    /**
     * Main refund, or null when no refund exists.
     */
    refund: (OrderPayoutInProgress | OrderPayoutCompleted | PayoutFailed) | null;
};

