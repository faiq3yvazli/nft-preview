import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@root/shared/ui/modal';
import clsx from 'clsx';

import { ConnectMetaMask } from '../containers/connect-meta-mask';
import { ConnectWalletConnect } from '../containers/connect-wallet-connect';
import { useSelectWallet } from '../hooks/use-select-wallet';
import { WalletUI } from '../components/wallet.ui';

const { Wrapper, Content, Title, Logo } = WalletUI;

export const SelectWallet = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'select-wallet' });
  const [{ selectedWallet, metamaskButtonExtraProps }, { close, select }] = useSelectWallet();

  const selectionNode = (
    <Fragment>
      <Wrapper className='mb-2' onClick={() => select('meta-mask')} {...metamaskButtonExtraProps}>
        <Content>
          <Title>{t('metamask')}</Title>
        </Content>
        <Logo src='/images/providers/metamask.webp' loading='lazy' alt='Metamask' />
      </Wrapper>
      <Wrapper disabled className={clsx('mb-2')}>
        <Content>
          <Title>{t('trust-wallet')}</Title>
        </Content>
        <Logo src='/images/providers/trust-wallet.webp' loading='lazy' alt='Trust Wallet' />
      </Wrapper>
      <Wrapper onClick={() => select('wallet-connect')}>
        <Content>
          <Title>{t('wallet-connect')}</Title>
        </Content>
        <Logo src='/images/providers/wallet-connect.webp' loading='lazy' alt='WalletConnect' />
      </Wrapper>
    </Fragment>
  );

  return (
    <Modal className='max-w-sm' title={t('title')} center isOpen onCancel={close}>
      {!selectedWallet && selectionNode}
      {selectedWallet === 'meta-mask' && <ConnectMetaMask />}
      {selectedWallet === 'wallet-connect' && <ConnectWalletConnect />}
    </Modal>
  );
};
