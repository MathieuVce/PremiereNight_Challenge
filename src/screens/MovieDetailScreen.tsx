import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MovieDetailScreenProps } from '@/navigation/types';

import { Colors } from '@/theme';


const MovieDetailScreen: React.FC<MovieDetailScreenProps> = () => {

  return (
    <View style={styles.container}>
      <Text>Movie Detail Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default MovieDetailScreen;
