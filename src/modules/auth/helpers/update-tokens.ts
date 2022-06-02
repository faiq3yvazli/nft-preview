import jwtDecode from 'jwt-decode';
import { setCookie } from '@root/shared/utils/cookies/set-cookie';

export type UpdateTokensOptions = { accessToken: string; walletType?: string };

export const updateTokens = ({ accessToken, walletType }: UpdateTokensOptions) => {
  const { exp: accessTokenExp } = jwtDecode<{ exp: number }>(accessToken);
  setCookie('accessToken', accessToken, accessTokenExp);
  if (walletType) {
    setCookie('walletType', walletType, accessTokenExp);
  }
};
