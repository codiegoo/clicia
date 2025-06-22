// extensions/theme.ext.js
import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? '#111820' : '#F8FAFC',
      color: props.colorMode === 'dark' ? '#FFFFFF' : '#111820',
    },
  }),
};

const colors = {
  brand: {
    darkBg: '#111820',
    lightBg: '#F8FAFC',
    cardDark: '#1F2937',
    cardLight: '#FFFFFF',
    textDarkPrimary: '#FFFFFF',
    textDarkSecondary: '#D1D5DB',
    textLightPrimary: '#111820',
    textLightSecondary: '#4B5563',
    accent: '#0A84FF',
  },
};

const customTheme = extendTheme({ config, styles, colors });

export default customTheme;
