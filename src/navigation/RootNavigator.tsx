import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { Colors, FontWeights } from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';

import { ROUTES } from './staticKeys';
import { TMainTabParamList, TRootStackParamList } from './types';

import HomeScreen from '@/screens/HomeScreen';
import WatchlistScreen from '@/screens/WatchlistScreen';
import MovieDetailScreen from '@/screens/MovieDetailScreen';

const Stack = createNativeStackNavigator<TRootStackParamList>();
const Tab = createBottomTabNavigator<TMainTabParamList>();

const FilmTabBarIcon = ({ color, size = 24 }: { color: string; size?: number }) => {
  return <Icon name="film-outline" size={size} color={color} />;
};

const TimeTabBarIcon = ({ color, size = 24 }: { color: string; size?: number }) => {
  return <Icon name="time-outline" size={size} color={color} />;
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: FontWeights.semibold,

        },
      }}>
      <Tab.Screen
        name={ROUTES.SCREEN_HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Spotlight',
          tabBarIcon: FilmTabBarIcon,
        }}
      />
      <Tab.Screen
        name={ROUTES.SCREEN_WATCHLIST}
        component={WatchlistScreen}
        options={{
          tabBarLabel: 'Watchlist',
          tabBarIcon: TimeTabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * Root Stack Navigator
 * Wraps the tab navigator and adds modal screens
 */
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.text.primary,
          headerTitleStyle: {
            fontWeight: FontWeights.semibold,

          },
          contentStyle: {
            backgroundColor: Colors.background,
          },
        }}>
        <Stack.Screen
          name={ROUTES.STACK_BOTTOM_TABS}
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTES.SCREEN_MOVIE_DETAILS}
          component={MovieDetailScreen}
          options={{
            title: 'Movie Details',
            presentation: 'card',
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;