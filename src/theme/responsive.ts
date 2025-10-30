import {Dimensions, PixelRatio} from 'react-native';

/**
 * Responsive utilities for consistent sizing across devices
 */

// Get device dimensions
const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Base dimensions (iPhone 8 or SE)
const BASE_WIDTH = 375;

/**
 * Scale a value based on screen width
 */
export const scale = (size: number): number => {
  const scaleFactor = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor));
};


/**
 * Moderate scale - prevents excessive scaling on tablets
 * Uses a factor to reduce the scaling effect
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  const scaleFactor = size + (scale(size) - size) * factor;
  return Math.round(PixelRatio.roundToNearestPixel(scaleFactor));
};

