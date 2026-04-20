'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-Black.eot');
    src: local('Proxima Nova Black'), local('ProximaNova-Black'),
        url('/fonts/ProximaNova-Black.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-Black.woff2') format('woff2'),
        url('/fonts/ProximaNova-Black.woff') format('woff'),
        url('/fonts/ProximaNova-Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-Extrabld.eot');
    src: local('Proxima Nova Extrabold'), local('ProximaNova-Extrabld'),
        url('/fonts/ProximaNova-Extrabld.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-Extrabld.woff2') format('woff2'),
        url('/fonts/ProximaNova-Extrabld.woff') format('woff'),
        url('/fonts/ProximaNova-Extrabld.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-SemiboldIt.eot');
    src: local('Proxima Nova Semibold Italic'), local('ProximaNova-SemiboldIt'),
        url('/fonts/ProximaNova-SemiboldIt.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-SemiboldIt.woff2') format('woff2'),
        url('/fonts/ProximaNova-SemiboldIt.woff') format('woff'),
        url('/fonts/ProximaNova-SemiboldIt.ttf') format('truetype');
    font-weight: 600;
    font-style: italic;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNovaT-Thin.eot');
    src: local('Proxima Nova Thin'), local('ProximaNovaT-Thin'),
        url('/fonts/ProximaNovaT-Thin.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNovaT-Thin.woff2') format('woff2'),
        url('/fonts/ProximaNovaT-Thin.woff') format('woff'),
        url('/fonts/ProximaNovaT-Thin.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-Light.eot');
    src: local('Proxima Nova Light'), local('ProximaNova-Light'),
        url('/fonts/ProximaNova-Light.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-Light.woff2') format('woff2'),
        url('/fonts/ProximaNova-Light.woff') format('woff'),
        url('/fonts/ProximaNova-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-BlackIt.eot');
    src: local('Proxima Nova Black Italic'), local('ProximaNova-BlackIt'),
        url('/fonts/ProximaNova-BlackIt.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-BlackIt.woff2') format('woff2'),
        url('/fonts/ProximaNova-BlackIt.woff') format('woff'),
        url('/fonts/ProximaNova-BlackIt.ttf') format('truetype');
    font-weight: 900;
    font-style: italic;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-BoldIt.eot');
    src: local('Proxima Nova Bold Italic'), local('ProximaNova-BoldIt'),
        url('/fonts/ProximaNova-BoldIt.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-BoldIt.woff2') format('woff2'),
        url('/fonts/ProximaNova-BoldIt.woff') format('woff'),
        url('/fonts/ProximaNova-BoldIt.ttf') format('truetype');
    font-weight: bold;
    font-style: italic;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-ThinIt.eot');
    src: local('Proxima Nova Thin Italic'), local('ProximaNova-ThinIt'),
        url('/fonts/ProximaNova-ThinIt.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-ThinIt.woff2') format('woff2'),
        url('/fonts/ProximaNova-ThinIt.woff') format('woff'),
        url('/fonts/ProximaNova-ThinIt.ttf') format('truetype');
    font-weight: 100;
    font-style: italic;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-Bold.eot');
    src: local('Proxima Nova Bold'), local('ProximaNova-Bold'),
        url('/fonts/ProximaNova-Bold.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-Bold.woff2') format('woff2'),
        url('/fonts/ProximaNova-Bold.woff') format('woff'),
        url('/fonts/ProximaNova-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-RegularIt.eot');
    src: local('Proxima Nova Regular Italic'), local('ProximaNova-RegularIt'),
        url('/fonts/ProximaNova-RegularIt.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-RegularIt.woff2') format('woff2'),
        url('/fonts/ProximaNova-RegularIt.woff') format('woff'),
        url('/fonts/ProximaNova-RegularIt.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-ExtrabldIt.eot');
    src: local('Proxima Nova Extrabold Italic'), local('ProximaNova-ExtrabldIt'),
        url('/fonts/ProximaNova-ExtrabldIt.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-ExtrabldIt.woff2') format('woff2'),
        url('/fonts/ProximaNova-ExtrabldIt.woff') format('woff'),
        url('/fonts/ProximaNova-ExtrabldIt.ttf') format('truetype');
    font-weight: 800;
    font-style: italic;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-Regular.eot');
    src: local('Proxima Nova Regular'), local('ProximaNova-Regular'),
        url('/fonts/ProximaNova-Regular.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-Regular.woff2') format('woff2'),
        url('/fonts/ProximaNova-Regular.woff') format('woff'),
        url('/fonts/ProximaNova-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-LightIt.eot');
    src: local('Proxima Nova Light Italic'), local('ProximaNova-LightIt'),
        url('/fonts/ProximaNova-LightIt.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-LightIt.woff2') format('woff2'),
        url('/fonts/ProximaNova-LightIt.woff') format('woff'),
        url('/fonts/ProximaNova-LightIt.ttf') format('truetype');
    font-weight: 300;
    font-style: italic;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('/fonts/ProximaNova-Semibold.eot');
    src: local('Proxima Nova Semibold'), local('ProximaNova-Semibold'),
        url('/fonts/ProximaNova-Semibold.eot?#iefix') format('embedded-opentype'),
        url('/fonts/ProximaNova-Semibold.woff2') format('woff2'),
        url('/fonts/ProximaNova-Semibold.woff') format('woff'),
        url('/fonts/ProximaNova-Semibold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
}



    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Proxima Nova', -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
        line-height: 1.5;
        background-color: ${({ theme }) => theme.colors.background};
        padding: 0;
        margin: 0;
    }

    :root {
        --space-xs: 4px;
        --space-sm: 8px;
        --space-base: 12px;
        --space-md: 16px;
        --space-wide: 20px;
        --space-lg: 24px;
        --space-xl: 32px;
    }

    :root {
        --body-font: 'Proxima Nova', -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
    }

    :root {
    --spf-alabaster: rgba(248, 248, 248, 1);
    --spf-alto: rgba(221, 221, 221, 1);
    --spf-aqua-haze: rgba(224, 239, 236, 1);
    --spf-beauty-bush: rgba(243, 207, 209, 1);
    --spf-black: rgba(0, 0, 0, 1);
    --spf-boston-blue: rgba(56, 115, 184, 1);
    --spf-champagne: rgba(250, 229, 209, 1);
    --spf-chicago: rgba(87, 87, 86, 1);
    --spf-edgewater: rgba(186, 220, 213, 1);
    --spf-friar-gray: rgba(123, 123, 122, 1);
    --spf-gallery: rgba(238, 238, 238, 1);
    --spf-geyser: rgba(212, 220, 230, 1);
    --spf-gray: rgba(144, 144, 144, 1);
    --spf-gray-nickel: rgba(178, 178, 177, 1);
    --spf-heavy-metal: rgba(31, 32, 29, 1);
    --spf-korma: rgba(138, 76, 16, 1);
    --spf-manhattan: rgba(244, 198, 154, 1);
    --spf-nile-blue: rgba(25, 49, 77, 1);
    --spf-rock-blue: rgba(161, 178, 200, 1);
    --spf-milano-red: rgba(214, 30, 0, 1);
    --spf-silver: rgba(204, 203, 203, 1);
    --spf-smalt-blue: rgba(78, 142, 127, 1);
    --spf-storm-dust: rgba(111, 111, 110, 1);
    --spf-selective-yellow: rgba(255, 187, 0, 1);
    --spf-tonys-pink: rgba(228, 149, 154, 1);
    --spf-totem-pole: rgba(155, 11, 20, 1);
    --spf-tuatara: rgba(60, 60, 59, 1);
    --spf-white: rgba(255, 255, 255, 1);

    --spf-font-xs: 10.875px;
    --spf-font-sm: 12px;
    --spf-font-md: 14px;
    --spf-font-lg: 16px;
    --spf-font-xl: 18px;
    --spf-font-2xl: 20px;
    --spf-font-3xl: 22px;
    --spf-font-4xl: 24px;
    --spf-font-5xl: 26px;
    --spf-font-6xl: 28px;
    --spf-font-7xl: 32px;

    --spf-button-sm: 11px;
    --spf-button-md: 13px;
    --spf-button-lg: 14.5px;
    --spf-heading-1: 22px;
    --spf-heading-2: 18px;
    --spf-heading-3: 14px;
    --spf-link-sm: 12px;
    --spf-link-md: 13px;
    --spf-link-lg: 14px;
  }
`;

export default GlobalStyles;
