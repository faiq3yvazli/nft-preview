import { Fragment } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { LoadingIcon } from '@root/shared/icons/loading';

import { WalletUI } from '../components/wallet.ui';
import { ConnectWalletUI } from '../components/connect-wallet.ui';
import { useWalletConnect } from '../hooks/use-wallet-connect';

export const ConnectWalletConnect = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'connect.wallet-connect' });
  useWalletConnect();

  return (
    <Fragment>
      <ConnectWalletUI.Description className='mb-4'>
        <Trans
          i18nKey='auth:connect.metamask.agreement'
          components={{ terms: <ConnectWalletUI.DescriptionHighlight href='/terms-of-use' target='_blank' rel='noreferref noopener' /> }}
        />
      </ConnectWalletUI.Description>
      <WalletUI.Wrapper disabled className='mb-4'>
        <WalletUI.Content>
          <WalletUI.Title>{t('initializing')}</WalletUI.Title>
        </WalletUI.Content>
        <LoadingIcon />
      </WalletUI.Wrapper>
      <WalletUI.Wrapper>
        <WalletUI.Content>
          <WalletUI.Title>{t('title')}</WalletUI.Title>
        </WalletUI.Content>
        <WalletUI.Logo src='/images/providers/connect.webp' loading='lazy' alt='WalletConnect' />
      </WalletUI.Wrapper>
    </Fragment>
  );
};
