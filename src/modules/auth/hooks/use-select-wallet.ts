import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { connectSlice } from '../store/connect/slice';
import { connectSelector } from '../store/connect/selector';
import { IWalletType } from '../types/wallet';

export const useSelectWallet = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(connectSelector.selectWalletIsOpen);
  const [selectedWallet, setSelectedWallet] = useState<IWalletType>();
  const metamaskIsInstalled = !!window.ethereum;

  const metamaskButtonExtraProps = useMemo(() => {
    if (!metamaskIsInstalled) {
      return {
        as: 'a',
        target: '_blank',
        href: `https://metamask.app.link/dapp/${window.location.host}/`,
        onClick: () => dispatch(connectSlice.actions.installMetaMaskExtensionAsked()),
      };
    }
  }, [dispatch, metamaskIsInstalled]);

  const close = useCallback(() => {
    dispatch(connectSlice.actions.selectWalletClosed());
  }, [dispatch]);

  const open = useCallback(() => {
    dispatch(connectSlice.actions.selectWalletOpened());
  }, [dispatch]);

  const select = useCallback((wallet: IWalletType) => {
    setSelectedWallet(wallet);
  }, []);

  const state = { isOpen, selectedWallet, metamaskIsInstalled, metamaskButtonExtraProps };
  const handlers = { open, close, select };

  return [state, handlers] as [typeof state, typeof handlers];
};
