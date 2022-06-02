import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@root/shared/ui/button';

import { authSelector } from '../store/selector';
import { useSelectWallet } from '../hooks/use-select-wallet';
import { useMyAccount } from '../hooks/use-my-account';
import { useTranslation } from 'react-i18next';

export const ProfileButton = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'profile' });
  const walletAddress = useSelector(authSelector.walletAddress);
  const [, selectWalletHandlers] = useSelectWallet();
  const [, myAccountHandlers] = useMyAccount();

  return (
    <Fragment>
      {!walletAddress && (
        <Button className='w-full lg:w-auto' onClick={selectWalletHandlers.open} bordered>
          {t('connect-wallet')}
        </Button>
      )}
      {!!walletAddress && (
        <Button className='w-full lg:w-auto lg:max-w-[16rem] flex items-center min-w-0' onClick={myAccountHandlers.open} bordered>
          <img className='mr-4' width={20} height={20} src='/images/auth/pie-chart.webp' loading='lazy' alt='Pie Chart' />
          <span className='flex-1 overflow-hidden whitespace-nowrap text-ellipsis'>{walletAddress}</span>
        </Button>
      )}
    </Fragment>
  );
};
