import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FormikConfig } from 'formik';
import * as yup from 'yup';

import { SignUpDto } from '../dtos/sign-up';
import { connectSelector } from '../store/connect/selector';
import { updateTokens } from '../helpers/update-tokens';
import { signUpService } from '../services/sign-up';
import { authSlice } from '../store/slice';

export const useSignUp = () => {
  const { t } = useTranslation(['auth', 'yup']);
  const dispatch = useDispatch();
  const wallet = useSelector(connectSelector.wallet);
  const signature = useSelector(connectSelector.signature);

  const initialValues = useMemo<SignUpDto>(
    () => ({
      walletAddress: wallet?.address || '',
      signature: signature || '',
      username: '',
      email: '',
      invitationCode: '',
      captchaToken: null,
    }),
    [signature, wallet?.address],
  );

  const onSubmit = useCallback<FormikConfig<SignUpDto>['onSubmit']>(
    async (values) => {
      dispatch(authSlice.actions.signUpPending(values));

      const result = await signUpService(values);

      if (result.status === 200) {
        updateTokens({ accessToken: result.payload.accessToken, walletType: wallet?.type });
        dispatch(authSlice.actions.signUpFulfilled(result.payload));
      } else {
        dispatch(authSlice.actions.signUpRejected(result.payload));
        toast.error(result.payload);
      }
    },
    [dispatch, wallet?.type],
  );

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      walletAddress: yup.string().required(),
      signature: yup.string().required(),
      invitationCode: yup.string().min(3).max(20).label(t('auth:sign-up.fields.invitation-code.label')),
      username: yup
        .string()
        .matches(/^[a-z\d_.]+$/, t('auth:sign-up.validations.incorrect-username'))
        .min(3)
        .max(20)
        .required()
        .label(t('auth:sign-up.fields.username.label')),
      email: yup
        .string()
        .test('noSpace', t('yup:string.no-space'), (value) => !value?.includes(' '))
        .matches(
          /^[-!#$%&'*+/\d=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/\d=?A-Z^_a-z`{|}~])*@[a-zA-Z\d](-*\.?[a-zA-Z\d])*\.[a-zA-Z](-?[a-zA-Z\d])+$/,
          t('auth:sign-up.validations.incorrect-email'),
        )
        .required()
        .label(t('auth:sign-up.fields.email.label')),
      captchaToken: yup.string().required().label(t('auth:sign-up.fields.captcha.label')),
    });
  }, [t]);

  return { initialValues, onSubmit, validationSchema };
};
