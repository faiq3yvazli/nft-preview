import { FC } from 'react';
import { QueryClientProvider } from 'react-query';

import { queryClient } from './client';

export const QueryProvider: FC = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
