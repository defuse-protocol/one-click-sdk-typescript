/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InvariantViolated = ({
    error: InvariantViolated.error;
    unmatched_deltas: Record<string, string>;
} | {
    error: InvariantViolated.error;
});
export namespace InvariantViolated {
    export enum error {
        UNMATCHED_DELTAS = 'unmatched_deltas',
    }
}

