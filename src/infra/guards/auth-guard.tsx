import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authSelector } from '@root/modules/auth/store/selector';
import { LoadingSection } from '@root/shared/ui/loading-section';

export const AuthGuard: FC = ({ children }) => {
  const isAuthed = useSelector(authSelector.isAuthed);
  const isInitialized = useSelector(authSelector.isInitialized);

  if (!isInitialized) {
    return <LoadingSection />;
  }

  if (isAuthed) {
    return <>{children}</>;
  }

  return <Navigate to='/connect' />;
};
