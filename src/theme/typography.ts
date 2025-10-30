import {Platform, TextStyle} from 'react-native';
import {scale} from './responsive';

/**
 * Typography system for consistent text styling
 *
 * Design Decision: This typography system provides:
 * - Responsive font sizes using the scale() function
 * - Platform-specific font families (iOS vs Android)
 * - Pre-defined text styles for different use cases
 * - Consistent line heights and letter spacing
 *
 * This follows the Open/Closed Principle (OCP) - open for extension
 * (add new text styles) but closed for modification (base scales remain stable).
 */

/**
 * Base font sizes - these scale responsively based on device size
 * Using a modular scale (1.25 ratio) for harmonious sizing
 */
const FontSizes = {
  xs: scale(10),
  sm: scale(12),
  base: scale(14),
  lg: scale(16),
  xl: scale(18),
  '2xl': scale(20),
  '3xl': scale(24),
  '4xl': scale(30),
  '5xl': scale(36),
  '6xl': scale(48),
} as const;

/**
 * Font weights
 * Using numeric values for better cross-platform compatibility
 */
const FontWeights = {
  light: '300' as TextStyle['fontWeight'],
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
} as const;

/**
 * Platform-specific font families
 * iOS: San Francisco (system default)
 * Android: Roboto (system default)
 *
 * Design Decision: Using system fonts ensures:
 * - Zero additional bundle size
 * - Native feel on each platform
 * - Automatic accessibility support (dynamic type on iOS)
 */
const FontFamilies = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
} as const;

/**
 * Pre-defined text styles for common use cases
 * Each style combines size, weight, and spacing for consistent typography
 */
export const Typography = {
  // Display styles - Large, attention-grabbing text
  display1: {
    fontSize: FontSizes['6xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['6xl'] * 1.2,
    letterSpacing: -0.5,
    fontFamily: FontFamilies.bold,
  } as TextStyle,

  display2: {
    fontSize: FontSizes['5xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['5xl'] * 1.2,
    letterSpacing: -0.3,
    fontFamily: FontFamilies.bold,
  } as TextStyle,

  // Heading styles - Section titles
  h1: {
    fontSize: FontSizes['4xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['4xl'] * 1.3,
    letterSpacing: -0.2,
    fontFamily: FontFamilies.bold,
  } as TextStyle,

  h2: {
    fontSize: FontSizes['3xl'],
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes['3xl'] * 1.3,
    fontFamily: FontFamilies.medium,
  } as TextStyle,

  h3: {
    fontSize: FontSizes['2xl'],
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes['2xl'] * 1.4,
    fontFamily: FontFamilies.medium,
  } as TextStyle,

  h4: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.xl * 1.4,
    fontFamily: FontFamilies.medium,
  } as TextStyle,

  // Body text styles
  bodyLarge: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.lg * 1.5,
    fontFamily: FontFamilies.regular,
  } as TextStyle,

  body: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.base * 1.5,
    fontFamily: FontFamilies.regular,
  } as TextStyle,

  bodySmall: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.sm * 1.5,
    fontFamily: FontFamilies.regular,
  } as TextStyle,

  // Label styles - Form labels, captions
  label: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.base * 1.4,
    fontFamily: FontFamilies.medium,
  } as TextStyle,

  labelSmall: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.sm * 1.4,
    fontFamily: FontFamilies.medium,
  } as TextStyle,

  // Caption and helper text
  caption: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.xs * 1.4,
    fontFamily: FontFamilies.regular,
  } as TextStyle,

  // Button text
  button: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.base * 1.2,
    fontFamily: FontFamilies.medium,
    textTransform: 'uppercase' as TextStyle['textTransform'],
    letterSpacing: 0.5,
  } as TextStyle,
} as const;

/**
 * Export individual constants for granular control when needed
 */
export {FontSizes, FontWeights, FontFamilies};
