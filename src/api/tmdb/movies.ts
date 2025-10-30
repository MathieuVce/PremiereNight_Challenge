import {get} from './client';
import {
  MovieListResponse,
  MovieDetails,
  GenreListResponse,
  MovieCategory,
  MovieListParams,
} from './types';

/**
 * Functions to interact with TMDB movie endpoints.
 */

/**
 * Fetch movies by category
 * Categories: now_playing, popular
 */
export const fetchMoviesByCategory = async (
  category: MovieCategory,
  params?: MovieListParams,
): Promise<MovieListResponse> => {
  const endpoint = `/movie/${category}`;
  return get<MovieListResponse>(endpoint, {params});
};

/**
 * Fetch now playing movies
 */
export const fetchNowPlayingMovies = (
  params?: MovieListParams,
): Promise<MovieListResponse> => {
  return fetchMoviesByCategory('now_playing', params);
};

/**
 * Fetch popular movies
 */
export const fetchPopularMovies = (
  params?: MovieListParams,
): Promise<MovieListResponse> => {
  return fetchMoviesByCategory('popular', params);
};

/**
 * Fetch detailed information about a specific movie
 */
export const fetchMovieDetails = async (
  movieId: number,
  params?: Pick<MovieListParams, 'language'>,
): Promise<MovieDetails> => {
  const endpoint = `/movie/${movieId}`;
  return get<MovieDetails>(endpoint, {params});
};

/**
 * Fetch list of all genres
 */
export const fetchGenres = async (language?: string): Promise<GenreListResponse> => {
  const endpoint = '/genre/movie/list';
  return get<GenreListResponse>(endpoint, {
    params: {language: language || 'en-US'},
  });
};
