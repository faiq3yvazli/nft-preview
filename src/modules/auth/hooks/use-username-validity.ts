import { useQuery } from 'react-query';
import { useDebouncedValue } from '@root/shared/utils/hooks/use-debounced-value';

import { getUsernameValidityService } from '../services/get-username-validity';

export const useUsernameValidity = (username?: string) => {
  const debouncedUsername = useDebouncedValue(username);

  const { data, isFetched } = useQuery(
    ['usernames', debouncedUsername, 'validity'],
    async ({ queryKey }) => {
      const [, username] = queryKey;

      if (!username) {
        return false;
      }

      const result = await getUsernameValidityService(username);

      return result.status === 200;
    },
    { enabled: !!debouncedUsername, keepPreviousData: true },
  );

  return { isValid: data, isFetched };
};
