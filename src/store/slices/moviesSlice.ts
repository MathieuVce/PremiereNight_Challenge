import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchMovieDetails,
  fetchGenres,
  MovieListResponse,
  MovieDetails,
  GenreListResponse,
} from '@/api/tmdb';
import {MoviesState} from '../types';

/**
 * Movies Redux Slice
 *
 * This slice manages the state of movies fetched from TMDB API.
 *
 * Design Decision: Using Redux Toolkit provides:
 * - Simplified Redux setup with less boilerplate
 * - Built-in immutability with Immer
 * - createAsyncThunk for handling async operations
 * - Type-safe actions and reducers
 *
 * This follows the Single Responsibility Principle (SRP) - this slice
 * only handles movie-related state, not watchlist or other features.
 */

/**
 * Initial state
 */
const initialState: MoviesState = {
  nowPlaying: [],
  popular: [],
  details: {},
  genres: [],
  currentPage: {
    nowPlaying: 1,
    popular: 1,
  },
  hasMore: {
    nowPlaying: true,
    popular: true,
  },
  loading: false,
  error: null,
};

/**
 * Async thunks for fetching movies
 * These handle the API calls and loading/error states automatically
 */

export const loadNowPlayingMovies = createAsyncThunk(
  'movies/loadNowPlaying',
  async (page: number = 1) => {
    return fetchNowPlayingMovies({page});
  },
);

export const loadPopularMovies = createAsyncThunk(
  'movies/loadPopular',
  async (page: number = 1) => {
    return fetchPopularMovies({page});
  },
);

export const loadMovieDetails = createAsyncThunk(
  'movies/loadDetails',
  async (movieId: number) => {
    return fetchMovieDetails(movieId);
  },
);

export const loadGenres = createAsyncThunk('movies/loadGenres', async () => {
  return fetchGenres();
});

/**
 * Movies slice
 */
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    /**
     * Clear error state
     */
    clearError: state => {
      state.error = null;
    },

    /**
     * Reset a specific category (useful for pull-to-refresh)
     */
    resetCategory: (
      state,
      action: PayloadAction<'nowPlaying' | 'popular'>,
    ) => {
      const category = action.payload;
      state[category] = [];
      state.currentPage[category] = 1;
      state.hasMore[category] = true;
    },
  },
  extraReducers: builder => {
    // Now Playing
    builder
      .addCase(loadNowPlayingMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadNowPlayingMovies.fulfilled,
        (state, action: PayloadAction<MovieListResponse>) => {
          state.loading = false;
          // If first page, replace; otherwise append
          if (action.payload.page === 1) {
            state.nowPlaying = action.payload.results;
          } else {
            state.nowPlaying.push(...action.payload.results);
          }
          state.currentPage.nowPlaying = action.payload.page;
          state.hasMore.nowPlaying = action.payload.page < action.payload.total_pages;
        },
      )
      .addCase(loadNowPlayingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load now playing movies';
      });

    // Popular
    builder
      .addCase(loadPopularMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadPopularMovies.fulfilled,
        (state, action: PayloadAction<MovieListResponse>) => {
          state.loading = false;
          if (action.payload.page === 1) {
            state.popular = action.payload.results;
          } else {
            state.popular.push(...action.payload.results);
          }
          state.currentPage.popular = action.payload.page;
          state.hasMore.popular = action.payload.page < action.payload.total_pages;
        },
      )
      .addCase(loadPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load popular movies';
      });

    // Movie Details
    builder
      .addCase(loadMovieDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadMovieDetails.fulfilled,
        (state, action: PayloadAction<MovieDetails>) => {
          state.loading = false;
          state.details[action.payload.id] = action.payload;
        },
      )
      .addCase(loadMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load movie details';
      });

    // Genres
    builder
      .addCase(loadGenres.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadGenres.fulfilled,
        (state, action: PayloadAction<GenreListResponse>) => {
          state.loading = false;
          state.genres = action.payload.genres;
        },
      )
      .addCase(loadGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load genres';
      });
  },
});

export const {clearError, resetCategory} = moviesSlice.actions;
export default moviesSlice.reducer;
