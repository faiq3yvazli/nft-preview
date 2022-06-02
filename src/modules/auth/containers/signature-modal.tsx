import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '@root/shared/ui/modal';
import { Button } from '@root/shared/ui/button';
import { useTranslation } from 'react-i18next';

import { connectSlice } from '../store/connect/slice';

export const SignatureModal = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'signature-modal' });
  const dispatch = useDispatch();

  const close = useCallback(() => {
    dispatch(connectSlice.actions.signatureRequestRejected());
  }, [dispatch]);

  const submit = useCallback(() => {
    dispatch(connectSlice.actions.signatureRequestAccepted());
  }, [dispatch]);

  return (
    <Modal className='max-w-sm' onCancel={close} hideClose isOpen>
      <Button className='w-full' onClick={submit}>
        {t('submit')}
      </Button>
    </Modal>
  );
};
