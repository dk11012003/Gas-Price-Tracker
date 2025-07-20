import { ethers } from "ethers";

const UNISWAP_POOL = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";

const ABI = [
  "function slot0() external view returns (uint160 sqrtPriceX96,int24 tick,uint16 observationIndex,uint16 observationCardinality,uint16 observationCardinalityNext,uint8 feeProtocol,bool unlocked)"
];

export async function fetchEthUsdPrice(): Promise<number> {
  const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com"); 
  const contract = new ethers.Contract(UNISWAP_POOL, ABI, provider);
  const slot0 = await contract.slot0(); 
  const sqrtPriceX96 = slot0[0] as bigint;

  const price = (sqrtPriceX96 ** 2n * 10n ** 12n) / 2n ** 192n;
  return Number(price) / 1e6; 
}
