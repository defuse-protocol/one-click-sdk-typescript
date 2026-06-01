/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Collects all admins and grantees of a role.
 *
 * # Uniqueness and ordering
 *
 * Account ids returned in vectors are unique but not ordered.
 */
export type PermissionedAccountsPerRole = {
    /**
     * The accounts that have admin permissions for the role.
     */
    admins: Array<string>;
    /**
     * The accounts that have been granted the role.
     */
    grantees: Array<string>;
};

