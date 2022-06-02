import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle<{ smallTexts?: boolean }>`
  .ReactModal__Body--open {
    overflow: hidden;
  }
  
  html {
    font-size: ${({ smallTexts }) => (smallTexts ? '13px' : '16px')};
  }
  
  body {
    background: ${({ theme }) => `linear-gradient(90deg, ${theme.gradient.primary.from} 0%, ${theme.gradient.primary.to} 100%)`};
    color: white;
    -webkit-font-smoothing: antialiased;
  }

  #walletconnect-wrapper {
    color: black;
  }
`;
