/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Collects super admin accounts and accounts that have been granted permissions defined by `AccessControlRole`.
 *
 * # Data structure
 *
 * Assume `AccessControlRole` is derived for the following enum, which is then passed as `role` attribute to `AccessControllable`.
 *
 * ```rust pub enum Role { PauseManager, UnpauseManager, } ```
 *
 * Then the returned data has the following structure:
 *
 * ```ignore PermissionedAccounts { super_admins: vec!["acc1.near", "acc2.near"], roles: HashMap::from([ ("PauseManager", PermissionedAccountsPerRole { admins: vec!["acc3.near", "acc4.near"], grantees: vec!["acc5.near", "acc6.near"], }), ("UnpauseManager", PermissionedAccountsPerRole { admins: vec!["acc7.near", "acc8.near"], grantees: vec!["acc9.near", "acc10.near"], }), ]) } ```
 *
 * # Uniqueness and ordering
 *
 * Account ids returned in vectors are unique but not ordered.
 */
export type PermissionedAccounts = {
    /**
     * The admins and grantees of all roles.
     */
    roles: Record<string, {
        /**
         * The accounts that have admin permissions for the role.
         */
        admins: Array<string>;
        /**
         * The accounts that have been granted the role.
         */
        grantees: Array<string>;
    }>;
    /**
     * The accounts that have super admin permissions.
     */
    super_admins: Array<string>;
};

