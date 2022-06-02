import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingSection } from '@root/shared/ui/loading-section';
import { useLazyBackground } from '@root/shared/utils/hooks/use-lazy-background';
import { useScrollRestoration } from '@root/shared/router/use-scroll-restoration';
import { useYupLocale } from '@root/infra/yup/hooks/use-yup-locale';
import { AuthGuard } from '@root/infra/guards/auth-guard';

import { authSelector } from '@root/modules/auth/store/selector';
import { useMetaMaskExtension } from '@root/modules/auth/hooks/use-meta-mask-extension';
import { useSSO } from '@root/modules/auth/hooks/use-sso';

const HomePage = lazy(() => import('@root/modules/home/pages/home').then((pkg) => ({ default: pkg.HomePage })));
const MintPage = lazy(() => import('@root/modules/mint/pages/mint').then((pkg) => ({ default: pkg.MintPage })));
const PrivacyPolicyPage = lazy(() => import('@root/modules/common/pages/privacy-policy').then((pkg) => ({ default: pkg.PrivacyPolicyPage })));
const TermsOfUsePage = lazy(() => import('@root/modules/common/pages/terms-of-use').then((pkg) => ({ default: pkg.TermsOfUsePage })));

export const RootRouter = () => {
  const isInitialized = useSelector(authSelector.isInitialized);
  const metamaskIsInitializing = useMetaMaskExtension();

  useSSO();
  useScrollRestoration();
  useLazyBackground();
  useYupLocale();

  if (!isInitialized || metamaskIsInitializing) {
    return <LoadingSection />;
  }

  return (
    <Suspense fallback={<LoadingSection />}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/terms-of-use' element={<TermsOfUsePage />} />
        <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
        <Route
          path='/mint'
          element={
            <AuthGuard>
              <MintPage />
            </AuthGuard>
          }
        />
        <Route path='/*' element={<Navigate to='/' replace />} />
      </Routes>
    </Suspense>
  );
};
