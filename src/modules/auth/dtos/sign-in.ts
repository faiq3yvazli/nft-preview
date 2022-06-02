export type SignInDto = {
  walletAddress: string;
  walletType: string;
  signature: string;
  ssoToken?: string;
};
