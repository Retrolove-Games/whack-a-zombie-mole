import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import AtariClassicChunky from './assets/fonts/AtariClassicChunky.woff';
import AtariClassicChunky2 from './assets/fonts/AtariClassicChunky.woff2';

export default createGlobalStyle`
  @font-face {
    font-family: 'Atari Classic Chunky';
    src: url(${AtariClassicChunky2}) format('woff2'),
        url(${AtariClassicChunky}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  * {
    cursor: default !important;
    user-select: none !important;
  }

  html {
    ${reset}
    font-family: 'Atari Classic Chunky';
    font-size: 10px;
    text-rendering: optimizeSpeed;

    // Vars
    --color-text: white;
    --color-background: black;
    --color-primary: rebeccapurple;
    --native-width: 320px;
    --native-height: 210px;
  }
`;
