import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { connectSlice } from '../store/connect/slice';

export const useMetaMaskConnect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectSlice.actions.walletConnectionPending({ walletType: 'meta-mask' }));
  }, [dispatch]);
};
