import { useQuery } from 'react-query';
import { useDebouncedValue } from '@root/shared/utils/hooks/use-debounced-value';

import { getEmailValidityService } from '../services/get-email-validity';

export const useEmailValidity = (email?: string) => {
  const debouncedEmail = useDebouncedValue(email);

  const { data, isFetched } = useQuery(
    ['emails', debouncedEmail, 'validity'],
    async ({ queryKey }) => {
      const [, email] = queryKey;

      if (!email) {
        return false;
      }

      const result = await getEmailValidityService(email);

      return result.status === 200;
    },
    { enabled: !!debouncedEmail, keepPreviousData: true },
  );

  return { isValid: data, isFetched };
};
