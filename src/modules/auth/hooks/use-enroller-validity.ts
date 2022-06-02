import { useQuery } from 'react-query';
import { Id } from '@root/shared/utils/types';
import { useDebouncedValue } from '@root/shared/utils/hooks/use-debounced-value';

import { getEnrollerValidityService } from '../services/get-enroller-validity';

export const useEnrollerValidity = (enrollerId?: Id) => {
  const debouncedEnrollerId = useDebouncedValue(enrollerId);

  const { data, isFetched } = useQuery(
    ['enrollers', debouncedEnrollerId, 'validity'],
    async ({ queryKey }) => {
      const [, enrollerId] = queryKey;

      if (!enrollerId) {
        return false;
      }

      const result = await getEnrollerValidityService(enrollerId);

      return result.status === 200;
    },
    { enabled: !!debouncedEnrollerId, keepPreviousData: true },
  );

  return { isValid: data, isFetched };
};
