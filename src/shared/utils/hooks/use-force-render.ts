import { useCallback, useState } from 'react';

export const useForceRender = () => {
  const [, setState] = useState<{}>({});

  return useCallback(() => setState({}), []);
};
