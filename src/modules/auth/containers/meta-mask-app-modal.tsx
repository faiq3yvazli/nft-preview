import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Modal } from '@root/shared/ui/modal';
import { Button } from '@root/shared/ui/button';

import { connectSlice } from '../store/connect/slice';

export const MetaMaskAppModal = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'connect.metamask.app-modal' });
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const close = useCallback(() => {
    dispatch(connectSlice.actions.metaMaskAppModalClosed());
    setSearchParams({}, { replace: true });
  }, [dispatch, setSearchParams]);

  return (
    <Modal className='max-w-sm' title='Login' onCancel={close} isOpen>
      <Button as='a' target='_system' className='w-full' href={`https://metamask.app.link/dapp/${window.location.host}/?ssoToken=${searchParams.get('ssoToken')}`}>
        {t('submit')}
      </Button>
    </Modal>
  );
};
