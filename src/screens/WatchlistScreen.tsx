import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WatchlistScreenProps } from '@/navigation/types';

import { Colors } from '@/theme';

const WatchlistScreen: React.FC<WatchlistScreenProps> = () => {

  return (
    <View style={styles.container}>
      <Text>Watchlist Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default WatchlistScreen;
