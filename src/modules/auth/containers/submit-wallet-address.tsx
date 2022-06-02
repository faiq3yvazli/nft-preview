import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Form, Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';

import { Button } from '@root/shared/ui/button';
import { TextField } from '@root/shared/form/fields/text-field';
import { timelinesSelector } from '@root/modules/timelines/store/selector';

import { SubmitWalletAddressDto } from '../dtos/submit-wallet-address';
import { useSubmitWalletAddress } from '../hooks/use-submit-wallet-address';
import { ConnectCounter } from '../components/connect-counter';
import { WhitelistUI } from '../components/whitelist-ui';

const { Title } = WhitelistUI;

const FormComponent: FC<FormikProps<SubmitWalletAddressDto>> = ({ isSubmitting }) => {
  const { t } = useTranslation('whitelist', { keyPrefix: 'form' });
  const whitelistingTimeline = useSelector(timelinesSelector.whitelisting);

  return (
    <Form className='mb-6 w-full'>
      {!!whitelistingTimeline && <Title>{t('title.available')}</Title>}
      {!whitelistingTimeline && <Title>{t('title.unavailable')}</Title>}
      <TextField isRequired center uppercase readOnly name='username' placeholder={t('fields.username.placeholder')} />
      <TextField isRequired center uppercase readOnly name='walletAddress' placeholder={t('fields.username.wallet-address')} />
      <Button type='submit' disabled={isSubmitting || !whitelistingTimeline} className='w-full mb-8'>
        {t('submit')}
      </Button>
      <ConnectCounter />
    </Form>
  );
};

export const SubmitWalletAddress = () => {
  const { initialValues, onSubmit, validationSchema } = useSubmitWalletAddress();

  return <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} component={FormComponent} />;
};
