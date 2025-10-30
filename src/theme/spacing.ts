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