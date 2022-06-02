import { DefaultTheme } from 'styled-components';
import tailwindConfig from '@root/tailwind/config';

export const theme: DefaultTheme = {
  ...tailwindConfig.theme.extend.colors,
};
