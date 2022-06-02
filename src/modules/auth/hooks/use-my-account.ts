import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { walletSelector } from '@root/modules/wallet/store/selector';
import { purchasesSelector } from '@root/modules/purchases/store/selector';

import { authSlice } from '../store/slice';
import { authSelector } from '../store/selector';

export const useMyAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector(authSelector.user);
  const balance = useSelector(walletSelector.balance);
  const [addressCopied, setAddressCopied] = useState<boolean>(false);
  const purchases = useSelector(purchasesSelector.self);

  const signOut = useCallback(() => {
    dispatch(authSlice.actions.signedOut());
  }, [dispatch]);

  const open = useCallback(() => {
    dispatch(authSlice.actions.myAccountOpened());
  }, [dispatch]);

  const close = useCallback(() => {
    dispatch(authSlice.actions.myAccountClosed());
  }, [dispatch]);

  const copyAddress = useCallback(() => {
    if (!!user?.address) {
      setAddressCopied(true);
      return navigator.clipboard.writeText(user?.address);
    }
  }, [user?.address]);

  const state = { user, balance, addressCopied, purchases };
  const handlers = { open, close, signOut, copyAddress };

  return [state, handlers] as [typeof state, typeof handlers];
};
