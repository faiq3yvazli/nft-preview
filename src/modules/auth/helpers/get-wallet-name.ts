import { IWalletType } from '../types/wallet';

export const getWalletName = (type: IWalletType): string => {
  switch (type) {
    case 'coinbase':
      return 'Coinbase';
    case 'meta-mask':
      return 'MetaMask';
    case 'wallet-connect':
      return 'WalletConnect';
  }
};
