export type IWalletType = 'meta-mask' | 'wallet-connect' | 'coinbase';
export type IWalletAddress = string;

export type IWallet = {
  type: IWalletType;
  address: IWalletAddress;
};
