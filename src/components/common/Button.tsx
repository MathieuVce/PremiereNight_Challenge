import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Colors, Typography, Spacing, BorderRadius, FontWeights} from '@/theme';

/**
 * Button Component
 */

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;

  /** Test ID for testing */
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
}) => {
  const isDisabled = disabled || loading;

  // Get variant-specific styles
  const variantStyle = getVariantStyle(variant, isDisabled);
  const variantTextStyle = getVariantTextStyle(variant, isDisabled);

  // Get size-specific styles
  const sizeStyle = getSizeStyle(size);
  const sizeTextStyle = getSizeTextStyle(size);

  return (
    <TouchableOpacity
      style={[styles.base, variantStyle, sizeStyle, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      testID={testID}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.text.primary}
          size="small"
        />
      ) : (
        <Text style={[styles.text, variantTextStyle, sizeTextStyle, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

/**
 * Get style based on variant
 */
const getVariantStyle = (
  variant: ButtonProps['variant'],
  disabled: boolean,
): ViewStyle => {
  if (disabled) {
    return styles.disabled;
  }

  switch (variant) {
    case 'primary':
      return styles.primary;
    case 'secondary':
      return styles.secondary;
    case 'outline':
      return styles.outline;
    case 'ghost':
      return styles.ghost;
    default:
      return styles.primary;
  }
};

/**
 * Get text style based on variant
 */
const getVariantTextStyle = (
  variant: ButtonProps['variant'],
  disabled: boolean,
): TextStyle => {
  if (disabled) {
    return styles.disabledText;
  }

  switch (variant) {
    case 'primary':
      return styles.primaryText;
    case 'secondary':
      return styles.secondaryText;
    case 'outline':
      return styles.outlineText;
    case 'ghost':
      return styles.ghostText;
    default:
      return styles.primaryText;
  }
};

/**
 * Get size-specific container style
 */
const getSizeStyle = (size: ButtonProps['size']): ViewStyle => {
  switch (size) {
    case 'small':
      return styles.small;
    case 'large':
      return styles.large;
    case 'medium':
    default:
      return styles.medium;
  }
};

/**
 * Get size-specific text style
 */
const getSizeTextStyle = (size: ButtonProps['size']): TextStyle => {
  switch (size) {
    case 'small':
      return styles.smallText;
    case 'large':
      return styles.largeText;
    case 'medium':
    default:
      return styles.mediumText;
  }
};

const styles = StyleSheet.create({
  // Base style
  base: {
    borderRadius: BorderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  // Variant styles
  primary: {
    backgroundColor: Colors.primary,
  },
  primaryText: {
    color: Colors.text.primary,
  },

  secondary: {
    backgroundColor: Colors.secondary,
  },
  secondaryText: {
    color: Colors.text.inverse,
  },

  outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  outlineText: {
    color: Colors.primary,
  },

  ghost: {
    backgroundColor: Colors.transparent,
  },
  ghostText: {
    color: Colors.primary,
  },

  disabled: {
    backgroundColor: Colors.surfaceLight,
    opacity: 0.6,
  },
  disabledText: {
    color: Colors.text.tertiary,
  },

  // Size styles
  small: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 32,
  },
  smallText: {
    ...Typography.labelSmall,
  },

  medium: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    minHeight: 44,
  },
  mediumText: {
    ...Typography.label,
  },

  large: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
    minHeight: 52,
  },
  largeText: {
    ...Typography.bodyLarge,
    fontWeight: FontWeights.semibold,
  },

  text: {
    textAlign: 'center',
  },
});

export default Button;
