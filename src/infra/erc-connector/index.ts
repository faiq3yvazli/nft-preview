import { ERC721Connector } from '@tw/nft-manager';
import tokenABI from '@root/shared/abi/TOKEN.json';

export const ercConnector = new ERC721Connector({
  CONTRACT_ADDRESS: process.env.REACT_APP_CONTRACT_ADDRESS,
  TOKEN_ABI: tokenABI,
  devMode: process.env.REACT_APP_ERC_CONNECTOR_ENV === 'development',
  connectContractImmediately: process.env.REACT_APP_ERC_CONNECTOR_ENV === 'development',
});
