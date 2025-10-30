import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {RootState} from './types';
import moviesReducer from './slices/moviesSlice';
import watchlistReducer from './slices/watchlistSlice';

/**
 * Redux store with all slices.
 */

/**
 * Create and configure the Redux store
 */
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    watchlist: watchlistReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
        ignoredActionPaths: [],
        ignoredPaths: [],
      },
    }),
  devTools: __DEV__, // Enable Redux DevTools in development only
});

/**
 * Type for the store's dispatch function
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Type custom hooks
 * ```
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Selectors - Encapsulate state access logic
 */
export const selectMovies = (state: RootState) => state.movies;
export const selectWatchlist = (state: RootState) => state.watchlist;

/**
 * Specific selectors for common use cases
 */
export const selectNowPlayingMovies = (state: RootState) =>
  state.movies.nowPlaying;
export const selectPopularMovies = (state: RootState) => state.movies.popular;
export const selectGenres = (state: RootState) => state.movies.genres;
export const selectMovieDetails = (movieId: number) => (state: RootState) =>
  state.movies.details[movieId];

export const selectWatchlistItems = (state: RootState) => state.watchlist.items;
export const selectIsInWatchlist = (movieId: number) => (state: RootState) =>
  state.watchlist.items.some(item => item.id === movieId);

export * as moviesSlice from './slices/moviesSlice';
export * as watchlistSlice from './slices/watchlistSlice';
export * from './types';
