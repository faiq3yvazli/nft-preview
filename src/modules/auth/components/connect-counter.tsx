import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Timeline } from '@root/modules/timelines/containers/timeline';
import { timelinesSelector } from '@root/modules/timelines/store/selector';

import { ConnectLandingUI } from './connect-landing.ui';

const { CounterContent, CounterDescription } = ConnectLandingUI;

export const ConnectCounter = () => {
  const { t } = useTranslation('whitelist', { keyPrefix: 'counter' });
  const timer = useSelector(timelinesSelector.current);

  if (!timer) {
    return null;
  }

  return (
    <CounterContent>
      <CounterDescription>{t('closes-in')}</CounterDescription>
      <Timeline />
    </CounterContent>
  );
};
