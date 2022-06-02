import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { connectSlice } from '../store/connect/slice';

export const useWalletConnect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectSlice.actions.walletConnectionPending({ walletType: 'wallet-connect' }));
  }, [dispatch]);
};
