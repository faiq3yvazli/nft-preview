import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider as BaseThemeProvider } from 'styled-components';
import { CarouselStyles } from '@root/shared/carousel/carousel-styles';

import { theme } from './theme';
import { GlobalStyles } from './global-styles';

export const ThemeProvider: FC = ({ children }) => {
  const { i18n } = useTranslation();
  const language = i18n.language.substring(0, 2);

  return (
    <BaseThemeProvider theme={theme}>
      <GlobalStyles smallTexts={language === 'jp'} />
      <CarouselStyles />
      {children}
    </BaseThemeProvider>
  );
};
