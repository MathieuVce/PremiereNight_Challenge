import React from 'react';
import {View, StyleSheet, ViewStyle, TouchableOpacity} from 'react-native';
import {Colors, Spacing, BorderRadius, Shadows} from '@/theme';

/**
 * Card Component
 */

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  pressable?: boolean;
  onPress?: () => void;
  elevation?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl';

  /** Test ID for testing */
  testID?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  pressable = false,
  onPress,
  elevation = 'base',
  testID,
}) => {
  const elevationStyle = Shadows[elevation];

  // If card is pressable, wrap in TouchableOpacity
  if (pressable) {
    return (
      <TouchableOpacity
        style={[styles.card, elevationStyle, style]}
        onPress={onPress}
        activeOpacity={0.8}
        testID={testID}>
        {children}
      </TouchableOpacity>
    );
  }

  // Otherwise render as View
  return (
    <View style={[styles.card, elevationStyle, style]} testID={testID}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    overflow: 'hidden',
  },
});

export default Card;
