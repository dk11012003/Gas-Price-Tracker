import { create } from 'zustand';

export type ChainData = {
  baseFee: number;
  priorityFee: number;
};

export type GasStore = {
  chains: {
    ethereum: ChainData;
    polygon: ChainData;
    arbitrum: ChainData;
  };
  usdPrice: number;
  updateChainData: (chain: keyof GasStore['chains'], data: ChainData) => void;
  setUsdPrice: (price: number) => void;
};

export const useGasStore = create<GasStore>((set) => ({
  chains: {
    ethereum: { baseFee: 0, priorityFee: 0 },
    polygon: { baseFee: 0, priorityFee: 0 },
    arbitrum: { baseFee: 0, priorityFee: 0 },
  },
  usdPrice: 3000,
  updateChainData: (chain, data) =>
    set((state) => ({
      chains: {
        ...state.chains,
        [chain]: data,
      },
    })),
  setUsdPrice: (price) => set({ usdPrice: price }),
}));
