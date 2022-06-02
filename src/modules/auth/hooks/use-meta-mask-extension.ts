import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { connectSelector } from '../store/connect/selector';

export const useMetaMaskExtension = () => {
  const { installExtensionAsked } = useSelector(connectSelector.metaMask);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);

  useEffect(() => {
    if (installExtensionAsked) {
      window.onfocus = () => {
        setIsInitializing(true);
        setTimeout(() => window.location.reload(), 2000);
      };
    }
  }, [installExtensionAsked]);

  return isInitializing;
};
