// src/lib/providers.ts
import { WebSocketProvider } from 'ethers';

export const ethereumWs = new WebSocketProvider('wss://mainnet.infura.io/ws/v3/a6a2e1c7658e4a248fe4181c0537fce2');
export const polygonWs = new WebSocketProvider('wss://polygon-mainnet.infura.io/ws/v3/a6a2e1c7658e4a248fe4181c0537fce2');
export const arbitrumWs = new WebSocketProvider('wss://arbitrum-mainnet.infura.io/ws/v3/a6a2e1c7658e4a248fe4181c0537fce2');
