/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * ERC-191: The standard for message signing in Ethereum, commonly used with `personal_sign()`. For more details, refer to [EIP-191](https://eips.ethereum.org/EIPS/eip-191).
 */
export type MultiPayloadErc191 = {
    /**
     * See [ERC-191](https://github.com/ethereum/ercs/blob/master/ERCS/erc-191.md)
     */
    payload: string;
    /**
     * There is no public key member because the public key can be recovered via `ecrecover()` knowing the data and the signature. Encoding: base58
     */
    signature: string;
    standard: MultiPayloadErc191.standard;
};
export namespace MultiPayloadErc191 {
    export enum standard {
        ERC191 = 'erc191',
    }
}

