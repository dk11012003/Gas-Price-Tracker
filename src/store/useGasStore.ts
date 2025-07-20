import { create } from 'zustand';

type GasDataPoint = {
  time: number;
  value: number;
  volume: number;
};

type GasStore = {
  gasPrices: {
    ethereum: number;
    polygon: number;
    arbitrum: number;
  };
  gasPriceHistory: {
    ethereum: GasDataPoint[];
    polygon: GasDataPoint[];
    arbitrum: GasDataPoint[];
  };
  updateGasPrices: (newPrices: {
    ethereum: number;
    polygon: number;
    arbitrum: number;
  }) => void;
};

export const useGasStore = create<GasStore>((set, get) => ({
  gasPrices: {
    ethereum: 0,
    polygon: 0,
    arbitrum: 0,
  },
  gasPriceHistory: {
    ethereum: [],
    polygon: [],
    arbitrum: [],
  },
  updateGasPrices: (newPrices) => {
    const now = Math.floor(Date.now() / 1000);
    const generateVolume = () => Math.floor(Math.random() * 1000) + 500;

    const newEntry = {
      ethereum: {
        time: now,
        value: newPrices.ethereum,
        volume: generateVolume(),
      },
      polygon: {
        time: now,
        value: newPrices.polygon,
        volume: generateVolume(),
      },
      arbitrum: {
        time: now,
        value: newPrices.arbitrum,
        volume: generateVolume(),
      },
    };

    const prev = get().gasPriceHistory;

    set({
      gasPrices: newPrices,
      gasPriceHistory: {
        ethereum: [...prev.ethereum.slice(-99), newEntry.ethereum],
        polygon: [...prev.polygon.slice(-99), newEntry.polygon],
        arbitrum: [...prev.arbitrum.slice(-99), newEntry.arbitrum],
      },
    });
  },
}));
