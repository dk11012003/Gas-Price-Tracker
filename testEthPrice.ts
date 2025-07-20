import { WebSocketProvider, formatEther } from 'ethers';

const INFURA_KEY = 'YOUR_INFURA_KEY';
const provider = new WebSocketProvider(`wss://mainnet.infura.io/ws/v3/${INFURA_KEY}`);

async function main() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log('Latest Block:', blockNumber);

    const feeData = await provider.getFeeData();
    console.log('Current Gas Price:', formatEther(feeData.gasPrice ?? 0), 'ETH');
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    provider.destroy(); 
  }
}

main();
