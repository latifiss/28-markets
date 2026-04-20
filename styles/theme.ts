import { DefaultTheme } from 'styled-components';

interface ThemeColors {
  white: string;
  text: string;
  textrev: string,
  altText: string;
  grayText: string;
  background: string;
  altBg: string;
  boxBg: string;
  adBg: string;
  black: string;
  border: string;
  stroke: string;
  selectBg: string;
  selectStroke: string;
  selectText: string;
  select: string;
  gallery: string;
  red: string;
  yellow: string;
  dust: string;
  orange: string;
  opinionMain: string;
  alabaster: string;
  alto: string;
  aquaHaze: string;
  beautyBush: string;
  bostonBlue: string;
  champagne: string;
  chicago: string;
  edgewater: string;
  friarGray: string;
  geyser: string;
  grayNickel: string;
  heavyMetal: string;
  korma: string;
  manhattan: string;
  nileBlue: string;
  rockBlue: string;
  milanoRed: string;
  silver: string;
  smaltBlue: string;
  stormDust: string;
  selectiveYellow: string;
  tonysPink: string;
  totemPole: string;
  tuatara: string;
  deep: string;
}

interface ThemeFonts {
  body: string;
  headline: string;
}

interface ThemeSpacing {
  xs: string;
  sm: string;
  base: string;
  md: string;
  wide: string;
  lg: string;
  xl: string;
}

export interface CustomTheme {
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
}

export const lightTheme: CustomTheme = {
  colors: {
    white: '#ffffff',
    text: '#1d1d1b',
    textrev: '#1d1d1b',
    altText: '#7b7b7a',
    grayText: '#909090',
    background: '#f5f5f5',
    altBg: '#f7f7f7',
    boxBg: '#ffffff',
    adBg: '#eeeeee',
    black: '#000000',
    border: '#dddddd',
    stroke: '#e0e0e0',
    selectBg: '#d7e3f1',
    selectStroke: '#a7c1e0',
    selectText: '#3873b8',
    select: '#4592fe',
    gallery: '#eeeeee',
    red: '#d61e00',
    yellow: '#ffbb00',
    dust: '#3c3c3b',
    orange: '#ff5033',
    opinionMain: '#e05e00',
    alabaster: '#f8f8f8',
    alto: '#dddddd',
    aquaHaze: '#e0efec',
    beautyBush: '#f3cfd1',
    bostonBlue: '#3873b8',
    champagne: '#fae5d1',
    chicago: '#575756',
    edgewater: '#badcd5',
    friarGray: '#7b7b7a',
    geyser: '#d4dce6',
    grayNickel: '#b2b2b1',
    heavyMetal: '#1f201d',
    korma: '#8a4c10',
    manhattan: '#f4c69a',
    nileBlue: '#19314d',
    rockBlue: '#a1b2c8',
    milanoRed: '#d61e00',
    silver: '#cccbbb',
    smaltBlue: '#4e8e7f',
    stormDust: '#6f6f6e',
    selectiveYellow: '#ffbb00',
    tonysPink: '#e4959a',
    totemPole: '#9b0b14',
    tuatara: '#3c3c3b',
  },
  fonts: {
    body: 'Gotham XNarrow, sans-serif',
    headline: 'Gotham XNarrow, serif',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    base: '12px',
    md: '16px',
    wide: '20px',
    lg: '24px',
    xl: '32px',
  },
};

export const darkTheme: CustomTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    white: '#ffffff',
    text: '#ffffff',
    textrev: '#fff',
    altText: '#909090',
    grayText: '#c0c0c0',
    background: '#1d1d1b',
    boxBg: '#1d1d1b',
    adBg: '#2c2c2b',
    border: '#404040ff',
    stroke: '#3c3c3b',
    selectBg: '#112337',
    selectStroke: '#1d3b5e',
    selectText: '#608fc6',
    dust: '#6f6f6e',
    heavyMetal: '#ffffff',
    deep: '#232323ff',
  },
};

