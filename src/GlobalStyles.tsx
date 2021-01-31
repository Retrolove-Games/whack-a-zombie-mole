import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
  html {
    ${reset}
    --color-text: white;
    --color-background: black;
    --color-primary: rebeccapurple;
  }
`;
