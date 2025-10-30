/**
 * Navigation Type Definitions
 */

import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import { ROUTES } from './staticKeys';

/**
 * Main navigator that contains the tab navigator and modal screens
 */
export type TRootStackParamList = {
  [k in typeof ROUTES.STACK_BOTTOM_TABS]: NavigatorScreenParams<TMainTabParamList>;
} & {
  [k in typeof ROUTES.SCREEN_MOVIE_DETAILS]: { movieId: number };
};

/**
 * Bottom tab navigation between main screens
 */
export type TMainTabParamList = {
  [k in typeof ROUTES.SCREEN_HOME]: undefined;
} & {
  [k in typeof ROUTES.SCREEN_WATCHLIST]: undefined;
};

/**
 * Root Stack Screen Props
 */
export type RootStackScreenProps<T extends keyof TRootStackParamList> =
  NativeStackScreenProps<TRootStackParamList, T>;

/**
 * Main Tab Screen Props
 */
export type MainTabScreenProps<T extends keyof TMainTabParamList> =
  BottomTabScreenProps<TMainTabParamList, T>;

/**
 * These handle the case where a tab screen needs to navigate to a stack screen
 */
export type HomeScreenProps = MainTabScreenProps<typeof ROUTES.SCREEN_HOME> &
  NativeStackScreenProps<TRootStackParamList>;

export type WatchlistScreenProps = MainTabScreenProps<typeof ROUTES.SCREEN_WATCHLIST> &
  NativeStackScreenProps<TRootStackParamList>;

export type MovieDetailScreenProps = RootStackScreenProps<typeof ROUTES.SCREEN_MOVIE_DETAILS>;

