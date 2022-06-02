import { useSelector } from 'react-redux';
import { Button } from '@root/shared/ui/button';
import { TimelineType } from '@root/modules/timelines/types/timeline';
import { timelinesSelector } from '@root/modules/timelines/store/selector';

import { WhitelistUI } from '../components/whitelist-ui';
import { ConnectCounter } from '../components/connect-counter';
import { useSelectWallet } from '../hooks/use-select-wallet';
import { useTranslation } from 'react-i18next';

const { Wrapper, Title, Description } = WhitelistUI;

export const WhitelistStatus = () => {
  const { t } = useTranslation('whitelist', { keyPrefix: 'statuses' });
  const timelineType = useSelector(timelinesSelector.type);
  const [, selectWalletHandlers] = useSelectWallet();

  if (timelineType === TimelineType.Whitelisting) {
    return (
      <Wrapper>
        <Title>{t('whitelisting.title')}</Title>
        <Description>{t('whitelisting.description')}</Description>
        <Button onClick={selectWalletHandlers.open} className='w-full mb-6'>
          {t('whitelisting.submit')}
        </Button>
        <ConnectCounter />
      </Wrapper>
    );
  }

  if (timelineType === TimelineType.PreSale) {
    return (
      <Wrapper>
        <Title>{t('pre-sale.title')}</Title>
        <Description>{t('pre-sale.description')}</Description>
        <Button onClick={selectWalletHandlers.open} className='w-full mb-6'>
          {t('pre-sale.submit')}
        </Button>
        <ConnectCounter />
      </Wrapper>
    );
  }

  if (timelineType === TimelineType.PublicSale) {
    return (
      <Wrapper>
        <Title>{t('public-sale.title')}</Title>
        <Description>{t('public-sale.description')}</Description>
        <Button onClick={selectWalletHandlers.open} className='w-full mb-6'>
          {t('public-sale.submit')}
        </Button>
        <ConnectCounter />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>{t('default.title')}</Title>
      <Description>{t('default.description')}</Description>
      <Button onClick={selectWalletHandlers.open} className='w-full mb-6'>
        {t('default.submit')}
      </Button>
    </Wrapper>
  );
};
