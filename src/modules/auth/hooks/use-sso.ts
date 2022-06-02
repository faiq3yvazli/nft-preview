import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { detectMobile } from '@root/shared/utils/detect-mobile';
import { ercConnector } from '@root/infra/erc-connector';

import { connectSlice } from '../store/connect/slice';

export const useSSO = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const ssoToken = searchParams.get('ssoToken');

  const handleSSO = useCallback(() => {
    if (!ssoToken) {
      return null;
    }

    if (ercConnector.metamask.checkInstalledStatus()) {
      setTimeout(() => {
        dispatch(connectSlice.actions.walletConnectionPending({ walletType: 'meta-mask', ssoToken }));
      }, 100);
      setSearchParams({}, { replace: true });
    } else if (detectMobile()) {
      dispatch(connectSlice.actions.metaMaskAppModalOpened());
    } else {
      toast.error('Please make sure that MetaMask extension is installed in your browser.');
      setSearchParams({}, { replace: true });
    }
  }, [dispatch, setSearchParams, ssoToken]);

  useEffect(() => {
    (() => handleSSO())();
  }, [handleSSO]);
};
