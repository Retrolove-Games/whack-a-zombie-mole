import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import AtariClassicChunky from './assets/fonts/AtariClassicChunky.woff';
import AtariClassicChunky2 from './assets/fonts/AtariClassicChunky.woff2';
import Cursor from "./assets/cursor.png";

export default createGlobalStyle`
  @font-face {
    font-family: 'Atari Classic Chunky';
    src: url(${AtariClassicChunky2}) format('woff2'),
        url(${AtariClassicChunky}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  ${reset}

  * {
    user-select: none !important;
    font-family: 'Atari Classic Chunky';
    font-size: 8px;
    text-rendering: optimizeSpeed;
  }

  html {
    font-family: 'Atari Classic Chunky';
    font-size: 8px;
    text-rendering: optimizeSpeed;

    // Config vars
    --color-text: #efefef;
    --color-background: black;
    --color-primary: rebeccapurple;
    --color-hover: #6c6c6c;
    --native-width: 320px;
    --native-height: 210px;
    --cursor: url(${Cursor});
  }


`;
