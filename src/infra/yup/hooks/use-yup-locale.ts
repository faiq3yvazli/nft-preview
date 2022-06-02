/* eslint-disable no-template-curly-in-string */

import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleObject } from 'yup/lib/locale';
import { setLocale } from 'yup';

export const useYupLocale = () => {
  const { t } = useTranslation('yup');

  const locale = useMemo<LocaleObject>(
    () => ({
      mixed: {
        required: t('mixed.required'),
      },
      string: {
        min: t('string.min'),
        max: t('string.max'),
        matches: t('string.matches'),
      },
    }),
    [t],
  );

  useEffect(() => {
    setLocale(locale);
  }, [locale]);
};
