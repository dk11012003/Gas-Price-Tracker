import { ethers } from 'ethers';

export type GasPrice = {
  timestamp: number;
  price: number;
};

export function subscribeToGasPriceUpdates(callback: (data: GasPrice[]) => void) {
  setInterval(() => {
    const timestamp = Math.floor(Date.now() / 1000); 
    const price = Math.floor(Math.random() * 100) + 1; 
    callback([{ timestamp, price }]);
  }, 3000);
}
