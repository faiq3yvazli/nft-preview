import { deleteCookie } from '@root/shared/utils/cookies/delete-cookie';

export const removeTokens = () => {
  deleteCookie('accessToken');
  deleteCookie('walletType');
  localStorage.removeItem('walletconnect');
};
