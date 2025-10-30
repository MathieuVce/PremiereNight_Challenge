import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet, ViewStyle} from 'react-native';

import {Colors, Typography, Spacing} from '@/theme';

/**
 * LoadingSpinner Component
 * Displays a loading indicator with optional message.
 */

export interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
  style?: ViewStyle;

  /** Test ID for detox */
  testID?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  size = 'large',
  color = Colors.primary,
  fullScreen = false,
  style,
  testID,
}) => {
  return (
    <View
      style={[
        styles.container,
        fullScreen && styles.fullScreen,
        style,
      ]}
      testID={testID}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  message: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginTop: Spacing.base,
    textAlign: 'center',
  },
});

export default LoadingSpinner;
