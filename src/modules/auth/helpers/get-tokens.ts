import { getCookie } from '@root/shared/utils/cookies/get-cookie';

export const getTokens = () => {
  const accessToken = getCookie('accessToken');
  const walletType = getCookie('walletType');

  return { accessToken, walletType };
};
