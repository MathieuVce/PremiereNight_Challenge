/**
 * Genre definition
 */
export interface Genre {
  id: number;
  name: string;
}

/**
 * Movie object returned by TMDB API
 * Contains full details about a movie
 */
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
}

/**
 * Detailed movie object with additional information
 * Returned by the movie details endpoint
 */
export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  runtime: number | null;
  tagline: string | null;
}


/**
 * Paginated response wrapper
 * TMDB returns results in a paginated format
 */
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/**
 * Movie list response
 */
export type MovieListResponse = PaginatedResponse<Movie>;

/**
 * Genre list response
 */
export interface GenreListResponse {
  genres: Genre[];
}

/**
 * API Error response
 */
export interface ApiError {
  status_code: number;
  status_message: string;
  success: boolean;
}

/**
 * Movie category types
 * Used to fetch different lists of movies
 */
export type MovieCategory = 'now_playing' | 'popular';

/**
 * Query parameters for movie list endpoints
 */
export interface MovieListParams {
  page?: number;
  language?: string;
  region?: string;
}
