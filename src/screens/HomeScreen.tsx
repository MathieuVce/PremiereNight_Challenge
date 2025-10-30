import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { HomeScreenProps } from '@/navigation/types';

import { Colors } from '@/theme';
import { ROUTES } from '@/navigation/staticKeys';



const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Go to details" onPress={() => {navigation.navigate(ROUTES.SCREEN_MOVIE_DETAILS)}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default HomeScreen;