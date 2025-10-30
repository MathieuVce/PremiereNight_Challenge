/**
 * Color palette for the application
 */

export const Colors = {
  // Primary colors
  primary: '#5B4B8A',
  primaryDark: '#3E2C6E',
  primaryLight: '#8E79C6',

  // Secondary colors
  secondary: '#4C9EEB',
  secondaryDark: '#2C6DB2',
  secondaryLight: '#A5D8FF',

  // Backgrounds
  background: '#0E0B1F',
  surface: '#1A1530',
  surfaceLight: '#2A2A2A',

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
    tertiary: '#808080',
    inverse: '#000000',
  },

  // Status, response colors
  error: '#F44336',

  // Border
  border: '#404040',

  // Transparent
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof Colors;
