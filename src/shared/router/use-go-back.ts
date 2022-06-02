import { useCallback } from 'react';
import { NavigateOptions, To, useLocation, useNavigate } from 'react-router-dom';

export const useGoBack = (to: To, options?: NavigateOptions) => {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    () => {
      if (location.key) {
        navigate(-1);
      } else {
        navigate(to, options);
      }
    },
    [location.key, navigate, options, to],
  );
};
