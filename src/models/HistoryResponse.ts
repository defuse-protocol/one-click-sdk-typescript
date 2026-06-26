/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HistoryItem } from './HistoryItem';
export type HistoryResponse = {
    /**
     * History items for the current page. When fetching older items (via prevCursor), fewer items than limit means you reached the end — no need to fetch further. For newer items (via nextCursor), new data can always appear later.
     */
    items: Array<HistoryItem>;
    /**
     * Pass it back as nextCursor to poll for newer items.
     */
    nextCursor?: string;
    /**
     * Pass it back as prevCursor to fetch older items.
     */
    prevCursor?: string;
};

