import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { connectSlice } from '../store/connect/slice';

export const useSignUpForm = () => {
  const dispatch = useDispatch();

  const changeWallet = useCallback(() => {
    dispatch(connectSlice.actions.changeWalletRequested());
  }, [dispatch]);

  const close = useCallback(() => {
    dispatch(connectSlice.actions.signUpClosed());
  }, [dispatch]);

  const state = {};
  const handlers = { changeWallet, close };

  return [state, handlers] as [typeof state, typeof handlers];
};
