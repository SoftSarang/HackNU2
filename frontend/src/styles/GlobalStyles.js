import { createGlobalStyle } from 'styled-components';
import '@fontsource/lora';
import '@fontsource/monda';

const GlobalStyles = createGlobalStyle`
    *,*::before, *::after,h1,h2,h3,h4,h5,h6 {
        margin: 0;
        padding: 0;
    }
    *{
        box-sizing: border-box;
    }
    body {
        font-family: "Monda", sans-serif;
        overflow-x: hidden;
        cursor: none; /* hide native cursor so custom cursor is the only visible one */
    }

    a {
        color: inherit;
        text-decoration: none;
        font-family: "Monda", sans-serif;
    }

    h1,h2,h3,h4,h5,h6 {
        line-height: 1.7;
    }

    p {
        line-height: 2;
    }
`;

export default GlobalStyles;
