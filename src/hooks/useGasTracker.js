'use client';

import { useEffect } from 'react';
import { ethers } from 'ethers';
import { useGasStore } from '@/store/gasStore';
import html2canvas from "html2canvas";


const CHAINS = [
  { name: 'Ethereum', rpc: 'https://mainnet.infura.io/v3/your-key', id: 1 },
  { name: 'Polygon', rpc: 'https://polygon-rpc.com', id: 137 },
];

export function useGasTracker() {
  const setGasData = useGasStore((state) => state.setGasData);

  useEffect(() => {
    async function fetchGas() {
      const allData = await Promise.all(
        CHAINS.map(async (chain) => {
          const provider = new ethers.JsonRpcProvider(chain.rpc);
          const feeData = await provider.getFeeData();
          return {
            chain: chain.name,
            gasPrice: parseFloat(ethers.formatUnits(feeData.gasPrice ?? 0n, 'gwei')),
            timestamp: Date.now(),
          };
        })
      );

      setGasData(allData);
    }

    fetchGas();
    const interval = setInterval(fetchGas, 10000);
    return () => clearInterval(interval);
  }, [setGasData]);
}
