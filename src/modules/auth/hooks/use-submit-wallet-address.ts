import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FormikConfig } from 'formik';
import * as yup from 'yup';

import { SubmitWalletAddressDto } from '../dtos/submit-wallet-address';
import { submitWalletAddressService } from '../services/submit-wallet-address';
import { whitelistSlice } from '../store/whitelist/slice';
import { authSelector } from '../store/selector';

export const useSubmitWalletAddress = () => {
  const { t } = useTranslation('whitelist', { keyPrefix: 'form' });
  const dispatch = useDispatch();
  const user = useSelector(authSelector.user);

  const initialValues = useMemo<SubmitWalletAddressDto>(
    () => ({
      username: user?.username || '',
      walletAddress: user?.address || '',
    }),
    [user?.username, user?.address],
  );

  const onSubmit = useCallback<FormikConfig<SubmitWalletAddressDto>['onSubmit']>(
    async (values) => {
      dispatch(whitelistSlice.actions.submitPending(values));
      const result = await submitWalletAddressService(values);

      if (result.status === 200) {
        dispatch(whitelistSlice.actions.submitFulfilled());
      } else {
        dispatch(whitelistSlice.actions.submitRejected(result.payload));
        toast.error(result.payload);
      }
    },
    [dispatch],
  );

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      username: yup.string().min(3).max(20).required().label(t('fields.username.label')),
      walletAddress: yup.string().required().label(t('fields.wallet-address.label')),
    });
  }, [t]);

  return { initialValues, onSubmit, validationSchema };
};
