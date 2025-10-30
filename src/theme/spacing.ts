import {moderateScale} from './responsive';

/**
 * Spacing system for consistent padding and margins
 */

/**
 * Base spacing unit (4px)
 * All spacing is derived from this base unit
 */
const BASE_UNIT = 4;

/**
 * Spacing scale
 * Values scale responsively based on device size
 */
export const Spacing = {
  none: 0,

  xs: moderateScale(BASE_UNIT * 1),

  sm: moderateScale(BASE_UNIT * 2),

  md: moderateScale(BASE_UNIT * 3),

  base: moderateScale(BASE_UNIT * 4),

  lg: moderateScale(BASE_UNIT * 5),

  xl: moderateScale(BASE_UNIT * 6),

  '2xl': moderateScale(BASE_UNIT * 8),

  '3xl': moderateScale(BASE_UNIT * 10),

  '4xl': moderateScale(BASE_UNIT * 12),

  '5xl': moderateScale(BASE_UNIT * 16),
} as const;

/**
 * Layout-specific spacing
 * Pre-defined spacing for common layout patterns
 */
export const LayoutSpacing = {
  screenPadding: Spacing.base,

  screenPaddingVertical: Spacing.xl,

  sectionSpacing: Spacing['3xl'],

  cardPadding: Spacing.base,

  cardSpacing: Spacing.md,

  listItemPadding: Spacing.base,

  listItemSpacing: Spacing.sm,

  buttonPaddingHorizontal: Spacing.xl,

  buttonPaddingVertical: Spacing.md,

  inputPadding: Spacing.base,

  iconSpacing: Spacing.sm,
} as const;

/**
 * Border radius scale for consistent roundness
 * Uses the same responsive scaling as spacing
 */
export const BorderRadius = {
  none: 0,

  sm: moderateScale(4),

  base: moderateScale(8),

  md: moderateScale(12),

  lg: moderateScale(16),

  xl: moderateScale(24),

  full: 9999,
} as const;

/**
 * Shadow configurations for elevation
 */
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  sm: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  base: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  md: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  lg: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },

  xl: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
} as const;