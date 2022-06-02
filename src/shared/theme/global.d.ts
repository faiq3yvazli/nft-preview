type ColorShade = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
type ColorValue = string;

type ThemeColorVariant = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
type ThemeColor = Record<ColorShade, ColorValue>;
type Gradient = { from: string; to: string };
type ThemeGradient = Record<'primary' | 'secondary' | 'ternary' | 'st-primary' | 'card', Gradient>;

type ThemePalette = Record<ThemeColorVariant, ThemeColor>;

interface Theme extends ThemePalette {
  gradient: ThemeGradient;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export {};
