import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@root/shared/ui/button';
import { commonSelector } from '@root/modules/common/store/selector';
import { timelinesSelector } from '@root/modules/timelines/store/selector';
import { TimelineType } from '@root/modules/timelines/types/timeline';

import { whitelistSelector } from '../store/whitelist/selector';
import { whitelistSlice } from '../store/whitelist/slice';

export const WhitelistResult = () => {
  const { t } = useTranslation('whitelist', { keyPrefix: 'result' });
  const dispatch = useDispatch();
  const isLoading = useSelector(whitelistSelector.statusIsRefreshing);
  const addedToSecondWhitelist = useSelector(whitelistSelector.isSufficientFunds);
  const timelineType = useSelector(timelinesSelector.type);
  const sufficientBalance = useSelector(commonSelector.sufficientBalance);

  const onClick = useCallback(() => {
    dispatch(whitelistSlice.actions.refreshStatusPending());
  }, [dispatch]);

  return (
    <div className='w-full max-w-xl'>
      <h1 className='text-mh2 lg:text-h2 font-iceberg uppercase text-center mb-4'>{t('title')}</h1>
      <div className='bg-gradient-to-r from-gradient-ternary-from to-gradient-ternary-to p-8 mb-8'>
        <p className='text-h4 lg:text-[2.5rem] lg:leading-tight font-iceberg uppercase text-center text-primary-400'>{t('description')}</p>
      </div>
      {!addedToSecondWhitelist && (timelineType === TimelineType.PreSale || timelineType === TimelineType.Whitelisting) && (
        <p className='text-mh4 lg:text-mh4 text-center font-bold opacity-75 mb-8 mx-auto max-w-md'>{t('insufficient-balance', { sufficientBalance })}</p>
      )}
      {!addedToSecondWhitelist && (timelineType === TimelineType.PreSale || timelineType === TimelineType.Whitelisting) && (
        <Button disabled={isLoading} onClick={onClick} className='w-full'>
          {t('refresh')}
        </Button>
      )}
      {addedToSecondWhitelist && (timelineType === TimelineType.PreSale || timelineType === TimelineType.PublicSale) && (
        <Button as={Link} to='/mint' className='w-full'>
          {t('mint')}
        </Button>
      )}
    </div>
  );
};
