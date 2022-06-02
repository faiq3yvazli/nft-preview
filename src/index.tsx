import '@root/shared/theme/style.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-multi-carousel/lib/styles.css';
//@ts-ignore
import isBetween from 'dayjs/plugin/isBetween';
import { I18nextProvider } from 'react-i18next';
import dayjs from 'dayjs';

import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RootRouter } from '@root/infra/router';
import { ThemeProvider } from '@root/shared/theme/provider';
import { ToastGlobalStyles } from '@root/shared/ui/toast/global-styles';
import { StoreProvider } from '@root/infra/store/provider';
import { QueryProvider } from '@root/infra/query/provider';
import i18n from '@root/i18n';
import { LoadingSection } from '@root/shared/ui/loading-section';

import reportWebVitals from './report-web-vitals';

dayjs.extend(isBetween);

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<LoadingSection />}>
      <I18nextProvider i18n={i18n}>
        <QueryProvider>
          <StoreProvider>
            <ThemeProvider>
              <BrowserRouter basename='/'>
                <ToastContainer />
                <ToastGlobalStyles />
                <RootRouter />
              </BrowserRouter>
            </ThemeProvider>
          </StoreProvider>
        </QueryProvider>
      </I18nextProvider>
    </Suspense>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
