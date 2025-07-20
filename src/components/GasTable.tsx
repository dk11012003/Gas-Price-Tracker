import React from 'react';
import { useGasStore } from '@/store/useGasStore';

const GasTable = () => {
  const { gasPrices, gasPriceHistory } = useGasStore();

  const chains = ['ethereum', 'polygon', 'arbitrum'] as const;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-left text-sm bg-gray-900 text-white rounded-md overflow-hidden shadow">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="px-6 py-3">Chain</th>
            <th className="px-6 py-3">Current Gas Price</th>
            <th className="px-6 py-3">Recent History</th>
          </tr>
        </thead>
        <tbody>
          {chains.map((chain) => {
            const current = gasPrices[chain];
            const history = gasPriceHistory[chain];

            return (
              <tr key={chain} className="border-b border-gray-700">
                <td className="px-6 py-3 capitalize">{chain}</td>
                <td className="px-6 py-3 text-sm">{current}</td>
                <td className="px-6 py-3 text-sm text-gray-300">
                  {history
                    .slice(-5)
                    .map((entry) => entry.value)
                    .join(' → ')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GasTable;
