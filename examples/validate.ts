import { quoteSample } from "./validate-sample";
import {
    validateQuoteDepositAddress,
} from "../src/custom/validate";

const publicKey = "0x039400c7dc419576781027d5aeddebaee22088172b18b76f2c3e53ca1765e19c4b";
const chainCode = "0x1e3f0f00431911762a5e0dd43d928265c77fec6e4d49f18232d9e57ab13fd91a";
const validate = async () => {
    validateQuoteDepositAddress(publicKey, chainCode, quoteSample);
}



validate().catch((err: Error) => console.error(err))