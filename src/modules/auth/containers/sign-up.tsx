import { FC, useCallback, useRef } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { Trans, useTranslation } from 'react-i18next';

import { Modal } from '@root/shared/ui/modal';
import { Button } from '@root/shared/ui/button';
import { TextField } from '@root/shared/form/fields/text-field';
import { ChevronBottomIcon } from '@root/shared/icons/chevron-botom';

import { useSignUp } from '../hooks/use-sign-up';
import { useSignUpForm } from '../hooks/use-sign-up-form';
import { useEmailValidity } from '../hooks/use-email-validity';
import { useEnrollerValidity } from '../hooks/use-enroller-validity';
import { useUsernameValidity } from '../hooks/use-username-validity';
import { getWalletName } from '../helpers/get-wallet-name';
import { connectSelector } from '../store/connect/selector';
import { SignUpUI } from '../components/sign-up.ui';
import { SignUpDto } from '../dtos/sign-up';

const { Wallet, RecaptchaWrapper } = SignUpUI;

const FormComponent: FC<FormikProps<SignUpDto>> = ({ isValid, values, errors, isSubmitting, setFieldValue }) => {
  const { t } = useTranslation('auth', { keyPrefix: 'sign-up' });
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [, { changeWallet, close }] = useSignUpForm();
  const wallet = useSelector(connectSelector.wallet);
  const emailValidity = useEmailValidity(values.email);
  const enrollerValidity = useEnrollerValidity(values.invitationCode);
  const usernameValidity = useUsernameValidity(values.username);

  const handleCaptchaChange = useCallback(
    (token: string | null) => {
      setFieldValue('captchaToken', token);
    },
    [setFieldValue],
  );

  const validFieldExtra = <span className='text-primary-400'>{t('available')}</span>;
  const invalidFieldExtra = <span className='text-danger-400'>{t('unavailable')}</span>;
  const validFieldSuffix = (
    <span className='flex items-center justify-center h-5 w-5 text-[0.5625rem] rounded-full bg-primary-400'>
      <ChevronBottomIcon />
    </span>
  );
  const invalidFieldSuffix = (
    <span className='flex items-center justify-center h-5 w-5 text-[0.5625rem] rounded-full bg-danger-400'>
      <ChevronBottomIcon />
    </span>
  );

  if (!wallet) {
    return null;
  }

  return (
    <Modal className='max-w-md' title={t('title')} isOpen onCancel={close}>
      <Form>
        <Wallet.Wrapper className='mb-4'>
          <Wallet.Body>
            <Wallet.Label>{t('wallet.title', { wallet: getWalletName(wallet.type) })}</Wallet.Label>
            <Wallet.Content>
              <img className='mr-3' width={16} height={16} loading='lazy' src='/images/auth/pie-chart.webp' alt='Pie Chart' />
              <Wallet.Value>{wallet.address}</Wallet.Value>
            </Wallet.Content>
          </Wallet.Body>
          <Wallet.Action>
            <Button onClick={changeWallet} className='py-2.5' bordered>
              {t('wallet.change')}
            </Button>
          </Wallet.Action>
        </Wallet.Wrapper>
        <TextField
          suffix={!errors.invitationCode && enrollerValidity.isFetched && (enrollerValidity.isValid ? validFieldSuffix : invalidFieldSuffix)}
          extra={!errors.invitationCode && enrollerValidity.isFetched && (enrollerValidity.isValid ? validFieldExtra : invalidFieldExtra)}
          name='invitationCode'
          label={t('fields.invitation-code.label')}
          placeholder={t('fields.invitation-code.placeholder')}
        />
        <TextField
          isRequired
          suffix={!errors.username && usernameValidity.isFetched && (usernameValidity.isValid ? validFieldSuffix : invalidFieldSuffix)}
          extra={!errors.username && usernameValidity.isFetched && (usernameValidity.isValid ? validFieldExtra : invalidFieldExtra)}
          name='username'
          label={t('fields.username.label')}
          helper={t('fields.username.helper')}
          placeholder={t('fields.username.placeholder')}
        />
        <TextField
          isRequired
          suffix={!errors.email && emailValidity.isFetched && (emailValidity.isValid ? validFieldSuffix : invalidFieldSuffix)}
          extra={!errors.email && emailValidity.isFetched && (emailValidity.isValid ? validFieldExtra : invalidFieldExtra)}
          name='email'
          label={t('fields.email.label')}
          placeholder={t('fields.email.placeholder')}
        />
        <RecaptchaWrapper>
          <ReCAPTCHA type='image' theme='light' ref={captchaRef} onChange={handleCaptchaChange} sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY || ''} />
        </RecaptchaWrapper>
        <Button type='submit' disabled={!isValid || isSubmitting} className='w-full mb-2'>
          {t('submit')}
        </Button>
        <p className='text-center'>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <Trans ns='auth' i18nKey='sign-up.agreement' components={{ terms: <a href='/terms-of-use' target='_blank' rel='noopener noreferrer' className='text-primary-400' /> }} />
        </p>
      </Form>
    </Modal>
  );
};

export const SignUp = () => {
  const { initialValues, onSubmit, validationSchema } = useSignUp();

  return <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} validateOnMount component={FormComponent} />;
};
