import ecc from 'tiny-secp256k1'
import { BIP32Factory } from 'bip32'
import { keccak_256 } from '@noble/hashes/sha3';
import { sha256 } from '@noble/hashes/sha2'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { QuoteResponse } from "../models/QuoteResponse";
import { QuoteRequest } from '../models/QuoteRequest';
import { encodeFunctionData, parseAbi } from 'viem'

type Hex = `0x${string}`;

export const validateQuoteDepositAddress = (teePublicKey: Hex, teeChainCode: Hex, { quote, quoteRequest }: QuoteResponse) => {
    if (quoteRequest.dry) {
        return;
    }

    if (quoteRequest.depositType !== QuoteRequest.depositType.ORIGIN_CHAIN) {
        return;
    }

    const allowedSwapTypes = [
        QuoteRequest.swapType.EXACT_INPUT,
        QuoteRequest.swapType.EXACT_OUTPUT
    ];

    if (!allowedSwapTypes.includes(quoteRequest.swapType)) {
        return;
    }

    const treasuryContract = '0x...'; // TODO
    // FIXME: adapt amount to asset decimals
    const calldata = encodeFunctionData({
        abi: parseAbi(['function transfer(address to, uint256 amount) returns (bool)']),
        functionName: 'transfer',
        args: [treasuryContract, quote.amountIn]
    });

    // FIXME: value is zero here => support also native assets (ie ETH)
    const value = '0';
    const chainId = getChainIdFromAsset(quoteRequest.originAsset);
    const to = getAddressFromAsset(quoteRequest.originAsset);
    const commitmentParams = [chainId, to, value, calldata];
    const commitmentHashHex = getCommitmentHash(commitmentParams);

    const bip32 = BIP32Factory(ecc);
    const deterministicPath = hexToBip32Path(commitmentHashHex);
    const publicKeyBytes = hexToBytes(teePublicKey);
    const chainCodeBytes = hexToBytes(teeChainCode);
    const parent = bip32.fromPublicKey(publicKeyBytes, chainCodeBytes);
    const child = parent.derivePath('m/' + deterministicPath);

    const address = getChildAddress(child);

    if (address !== quote.depositAddress) {
        throw new Error(`Deposit address ${quote.depositAddress} is invalid, expected address ${address}`);
    }
}

function getAddressFromAsset(originAsset: string) {
    // TODO
    return '0x63706e401c06ac8513145b7687A14804d17f814b'; // AAVE on base
}

const hexToBip32Path = (hexString: Hex) => {
    const cleanHex = hexString.slice(2);
    if (cleanHex.length !== 64) {
        throw new Error(`Expected 64 hex characters (32 bytes), got ${cleanHex.length}`);
    }

    if (!/^[0-9a-fA-F]+$/.test(cleanHex)) {
        throw new Error('Invalid hex string: contains non-hexadecimal characters');
    }

    const path = [];
    const nonHardenedLimit = 2 ** 31 - 1
    for (let i = 0; i < 64; i += 8) {
        const chunk = cleanHex.slice(i, i + 8);
        const value = parseInt(chunk, 16) % nonHardenedLimit;
        path.push(value.toString());
    }
    return path.join('/');
}

const publicKeyToAddress = (uncompressedPublicKey: Hex): Hex => {
    const pubKey = uncompressedPublicKey.startsWith('0x')
        ? uncompressedPublicKey.slice(2)
        : uncompressedPublicKey;

    if (pubKey.length !== 130) {
        throw new Error(`Expected 130 hex characters for uncompressed public key, got ${pubKey.length}`);
    }

    const pubKeyBytes = hexToBytes(pubKey.slice(2));
    const hash = keccak_256(pubKeyBytes);
    const hashHex = bytesToHex(hash);

    return `0x${hashHex.slice(-40)}` as Hex;
}


const getChildAddress = (child) => {
    const uncompressedPublicKey = Buffer.from(ecc.pointCompress(child.publicKey, false)).toString('hex')
    return ethers.computeAddress(`0x${uncompressedPublicKey}`)
}

const getCommitmentHash = (commitmentParams: Array<string>): Hex => {
    const hash = sha256.create();
    const encoder = new TextEncoder();
    for (const str of commitmentParams) {
        hash.update(encoder.encode(str))
    }
    return `0x${bytesToHex(hash.digest())}`;
}

const getChainIdFromAsset = (asset: string) => {
    // TODO:
    return '8453';
}

const data = encodeFunctionData({
    abi: parseAbi(['function mint(uint256 amount)']),
    functionName: 'mint',
    args: [100n]
})