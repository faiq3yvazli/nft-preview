import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18NHttpBackend from 'i18next-http-backend';
import I18NLanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(I18NHttpBackend)
  .use(I18NLanguageDetector)
  .use(initReactI18next)
  .init({
    load: 'languageOnly',
    supportedLngs: ['en', 'es', 'de', 'kr', 'jp', 'sk', 'cn', 'it', 'fr'],
    backend: {
      customHeaders: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
