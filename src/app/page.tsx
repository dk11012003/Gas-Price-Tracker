'use client';
import React, { useEffect } from 'react';
import { useGasStore } from '@/store/useGasStore';
import GasTable from '@/components/GasTable';
import Chart from '@/components/Chart';

export default function Home() {
  const updateGasPrices = useGasStore((state) => state.updateGasPrices);

  useEffect(() => {
    const interval = setInterval(() => {
      updateGasPrices({
        ethereum: Math.floor(Math.random() * 100) + 20,
        polygon: Math.floor(Math.random() * 50) + 10,
        arbitrum: Math.floor(Math.random() * 70) + 15,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-green">
        ⛽ GAS PRICE DASHBOARD
      </h1>
      <GasTable />
      <Chart />
    </main>
  );
}
