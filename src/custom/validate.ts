import * as secp from "@noble/secp256k1";
import { QuoteResponse } from "../models/QuoteResponse";
import { QuoteRequest } from "../models/QuoteRequest";
import { concat, encodeFunctionData, Hex, hexToBytes, parseAbi, sha256, toHex } from "viem";
import { Address, HDKey, publicKeyToAddress } from "viem/accounts";
import { TokenResponse } from "../models/TokenResponse";

const CHAIN_ID_MAP = {
    eth: 1,
    base: 8453,
    arb: 42161,
    gnosis: 100,
    bera: 80084,
    bsc: 56,
    pol: 137,
    op: 10,
    avax: 43114,
    xlayer: 196,
};

export const validateQuoteDepositAddress = (
    teePublicKey: Hex,
    teeChainCode: Hex,
    quoteResponse: QuoteResponse
) => {
    const { quote, quoteRequest } = quoteResponse;

    if (quoteRequest.dry) {
        return;
    }

    if (quoteRequest.depositType !== QuoteRequest.depositType.ORIGIN_CHAIN) {
        return;
    }

    const allowedSwapTypes = [
        QuoteRequest.swapType.EXACT_INPUT,
        QuoteRequest.swapType.EXACT_OUTPUT,
    ];

    if (!allowedSwapTypes.includes(quoteRequest.swapType)) {
        return;
    }

    const { chain, address: assetAddress } = getAssetDetails(quoteRequest.originAsset);

    const allowedBlockchains = Object.values(TokenResponse.blockchain);
    if (!allowedBlockchains.includes(chain)) {
        return;
    }

    // FIXME: put 0x2CfF890f0378a11913B6129B2E97417a2c302680
    const treasury = "0xCEf67989ae740cC9c92fa7385F003F84EAAFd915";
    const amount = BigInt(quote.amountIn);

    const calldata = encodeFunctionData({
        abi: parseAbi(["function transfer(address, uint256)"]),
        functionName: "transfer",
        args: [treasury, amount],
    });

    // FIXME: value is zero here => support also native assets (ie ETH)
    const value = "0";
    const chainId = CHAIN_ID_MAP[chain as keyof typeof CHAIN_ID_MAP].toString();
    const commitmentParams = [chainId, assetAddress, value, calldata];
    const commitmentHashHex = getCommitmentHash(commitmentParams);

    const deterministicPath = hexToBip32Path(commitmentHashHex);
    const publicKeyBytes = hexToBytes(teePublicKey);
    const chainCodeBytes = hexToBytes(teeChainCode);
    const hd = new HDKey({
        publicKey: publicKeyBytes,
        chainCode: chainCodeBytes,
    });

    const child = hd.derive("m/" + deterministicPath);
    const point = secp.Point.fromBytes(child.publicKey as secp.Bytes);
    const uncompressed = concat(["0x04", toHex(point.x), toHex(point.y)]);
    const address = publicKeyToAddress(uncompressed);

    if (address !== quote.depositAddress) {
        throw new Error(
            `Deposit address ${quote.depositAddress} is invalid, expected address ${address}`
        );
    }
};

const hexToBip32Path = (hexString: Hex): string => {
    const cleanHex = hexString.slice(2);
    if (cleanHex.length !== 64) {
        throw new Error(`Expected 64 hex characters (32 bytes), got ${cleanHex.length}`);
    }

    if (!/^[0-9a-fA-F]+$/.test(cleanHex)) {
        throw new Error("Invalid hex string: contains non-hexadecimal characters");
    }

    const path = [];
    const nonHardenedLimit = 2 ** 31 - 1;
    for (let i = 0; i < 64; i += 8) {
        const chunk = cleanHex.slice(i, i + 8);
        const value = parseInt(chunk, 16) % nonHardenedLimit;
        path.push(value.toString());
    }
    return path.join("/");
};

const getCommitmentHash = (commitmentParams: Array<string>): Hex => {
    const encoder = new TextEncoder();
    const combinedBytes: Array<number> = [];
    commitmentParams.map((str) => {
        combinedBytes.push(...encoder.encode(str));
    });
    const combined = Uint8Array.from(combinedBytes);
    return sha256(combined, "hex");
};

function getAssetDetails(originAsset: string): {
    chain: TokenResponse.blockchain;
    address: Address;
} {
    const [, chainAndAddress] = originAsset.split(":");
    let [chain, address] = chainAndAddress.split("-");
    address = address.replace(".omft.near", "");
    address = address.replace(".stft.near", "");
    return {
        chain: chain as TokenResponse.blockchain,
        address: address as Address,
    };
}
