import {Movie, MovieDetails} from '@/api/tmdb';

/**
 * Redux Store Type
 */

/**
 * Used to track loading and error states for async operations
 */
export interface AsyncState {
  loading: boolean;
  error: string | null;
}

/**
 * Movie state
 * Stores different categories of movies
 */
export interface MoviesState extends AsyncState {
  nowPlaying: Movie[];
  popular: Movie[];
  details: {[movieId: number]: MovieDetails};
  genres: {id: number; name: string}[];
  currentPage: {
    nowPlaying: number;
    popular: number;
  };
  hasMore: {
    nowPlaying: boolean;
    popular: boolean;
  };
}

/**
 * Watchlist movie item
 */
export interface WatchlistItem extends Movie {
  addedAt: number; // Timestamp when added to watchlist
}

/**
 * Stores user's saved movies
 */
export interface WatchlistState extends AsyncState {
  items: WatchlistItem[];
}

/**
 * Combines all slice states
 */
export interface RootState {
  movies: MoviesState;
  watchlist: WatchlistState;
}
