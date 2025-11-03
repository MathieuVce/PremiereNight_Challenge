import moviesReducer, {
  loadNowPlayingMovies,
  loadPopularMovies,
  loadMovieDetails,
  loadGenres,
  resetCategory,
} from '@/store/slices/moviesSlice';
import {MoviesState} from '@/store/types';

describe('Movies Slice - Simple Tests', () => {

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

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = moviesReducer(undefined, {type: 'unknown'});

      expect(state).toEqual(initialState);
    });

    it('should have empty arrays by default', () => {
      const state = moviesReducer(undefined, {type: 'unknown'});

      expect(state.nowPlaying).toEqual([]);
      expect(state.popular).toEqual([]);
      expect(state.genres).toEqual([]);
    });

    it('should not be loading initially', () => {
      const state = moviesReducer(undefined, {type: 'unknown'});

      expect(state.loading).toBe(false);
    });

    it('should have no error initially', () => {
      const state = moviesReducer(undefined, {type: 'unknown'});

      expect(state.error).toBeNull();
    });
  });

  describe('Simple Actions', () => {
    it('should reset nowPlaying category', () => {
      const stateWithMovies = {
        ...initialState,
        nowPlaying: [{id: 1, title: 'Movie 1'} as any],
        currentPage: {nowPlaying: 3, popular: 1},
        hasMore: {nowPlaying: false, popular: true},
      };

      const state = moviesReducer(stateWithMovies, resetCategory('nowPlaying'));

      expect(state.nowPlaying).toEqual([]);
      expect(state.currentPage.nowPlaying).toBe(1);
      expect(state.hasMore.nowPlaying).toBe(true);
    });

    it('should reset popular category', () => {
      const stateWithMovies = {
        ...initialState,
        popular: [{id: 1, title: 'Movie 1'} as any],
        currentPage: {nowPlaying: 1, popular: 5},
        hasMore: {nowPlaying: true, popular: false},
      };

      const state = moviesReducer(stateWithMovies, resetCategory('popular'));

      expect(state.popular).toEqual([]);
      expect(state.currentPage.popular).toBe(1);
      expect(state.hasMore.popular).toBe(true);
    });
  });

  describe('Loading States', () => {
    it('should set loading to true when loading now playing movies', () => {
      const action = loadNowPlayingMovies.pending('', 1);
      const state = moviesReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set loading to true when loading popular movies', () => {
      const action = loadPopularMovies.pending('', 1);
      const state = moviesReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set loading to true when loading movie details', () => {
      const action = loadMovieDetails.pending('', 123);
      const state = moviesReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set loading to true when loading genres', () => {
      const action = loadGenres.pending('');
      const state = moviesReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('Success States - Now Playing', () => {
    it('should load now playing movies on first page', () => {
      const mockMovies = [
        {id: 1, title: 'Movie 1'},
        {id: 2, title: 'Movie 2'},
      ] as any;

      const action = loadNowPlayingMovies.fulfilled(
        {
          results: mockMovies,
          page: 1,
          total_pages: 5,
          total_results: 100,
        },
        '',
        1
      );

      const state = moviesReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.nowPlaying).toEqual(mockMovies);
      expect(state.currentPage.nowPlaying).toBe(1);
      expect(state.hasMore.nowPlaying).toBe(true);
    });

    it('should append now playing movies on subsequent pages', () => {
      const existingMovies = [{id: 1, title: 'Movie 1'}] as any;
      const newMovies = [{id: 2, title: 'Movie 2'}] as any;

      const stateWithMovies = {
        ...initialState,
        nowPlaying: existingMovies,
      };

      const action = loadNowPlayingMovies.fulfilled(
        {
          results: newMovies,
          page: 2,
          total_pages: 5,
          total_results: 100,
        },
        '',
        2
      );

      const state = moviesReducer(stateWithMovies, action);

      expect(state.nowPlaying.length).toBe(2);
      expect(state.nowPlaying).toEqual([...existingMovies, ...newMovies]);
      expect(state.currentPage.nowPlaying).toBe(2);
    });

    it('should set hasMore to false on last page', () => {
      const mockMovies = [{id: 1, title: 'Movie 1'}] as any;

      const action = loadNowPlayingMovies.fulfilled(
        {
          results: mockMovies,
          page: 5,
          total_pages: 5,
          total_results: 100,
        },
        '',
        5
      );

      const state = moviesReducer(initialState, action);

      expect(state.hasMore.nowPlaying).toBe(false);
    });
  });

  describe('Success States - Popular', () => {
    it('should load popular movies on first page', () => {
      const mockMovies = [
        {id: 10, title: 'Popular 1'},
        {id: 20, title: 'Popular 2'},
      ] as any;

      const action = loadPopularMovies.fulfilled(
        {
          results: mockMovies,
          page: 1,
          total_pages: 10,
          total_results: 200,
        },
        '',
        1
      );

      const state = moviesReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.popular).toEqual(mockMovies);
      expect(state.currentPage.popular).toBe(1);
      expect(state.hasMore.popular).toBe(true);
    });

    it('should append popular movies on page 2', () => {
      const existingMovies = [{id: 10, title: 'Popular 1'}] as any;
      const newMovies = [{id: 20, title: 'Popular 2'}] as any;

      const stateWithMovies = {
        ...initialState,
        popular: existingMovies,
      };

      const action = loadPopularMovies.fulfilled(
        {
          results: newMovies,
          page: 2,
          total_pages: 10,
          total_results: 200,
        },
        '',
        2
      );

      const state = moviesReducer(stateWithMovies, action);

      expect(state.popular.length).toBe(2);
      expect(state.popular).toEqual([...existingMovies, ...newMovies]);
    });
  });

  describe('Success States - Movie Details', () => {
    it('should load movie details', () => {
      const mockDetails = {
        id: 123,
        title: 'Inception',
        overview: 'A mind-bending thriller',
        vote_average: 8.8,
      } as any;

      const action = loadMovieDetails.fulfilled(mockDetails, '', 123);

      const state = moviesReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.details[123]).toEqual(mockDetails);
    });

    it('should store multiple movie details', () => {
      const mockDetails1 = {id: 1, title: 'Movie 1'} as any;
      const mockDetails2 = {id: 2, title: 'Movie 2'} as any;

      let state = moviesReducer(initialState, loadMovieDetails.fulfilled(mockDetails1, '', 1));
      state = moviesReducer(state, loadMovieDetails.fulfilled(mockDetails2, '', 2));

      expect(state.details[1]).toEqual(mockDetails1);
      expect(state.details[2]).toEqual(mockDetails2);
      expect(Object.keys(state.details).length).toBe(2);
    });
  });

  describe('Success States - Genres', () => {
    it('should load genres', () => {
      const mockGenres = [
        {id: 28, name: 'Action'},
        {id: 12, name: 'Adventure'},
      ];

      const action = loadGenres.fulfilled({genres: mockGenres}, '');

      const state = moviesReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.genres).toEqual(mockGenres);
    });
  });

  describe('Error States', () => {
    it('should set error when loading now playing fails', () => {
      const action = loadNowPlayingMovies.rejected(
        new Error('Network error'),
        '',
        1
      );

      const state = moviesReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
    });

    it('should set error when loading popular fails', () => {
      const action = loadPopularMovies.rejected(
        new Error('API error'),
        '',
        1
      );

      const state = moviesReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('API error');
    });

    it('should set error when loading details fails', () => {
      const action = loadMovieDetails.rejected(
        new Error('Movie not found'),
        '',
        999
      );

      const state = moviesReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Movie not found');
    });

    it('should set error when loading genres fails', () => {
      const action = loadGenres.rejected(
        new Error('Genres unavailable'),
        ''
      );

      const state = moviesReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Genres unavailable');
    });

    it('should use default error message when error has no message', () => {
      const action = {
        type: loadNowPlayingMovies.rejected.type,
        error: {},
      } as any;

      const state = moviesReducer(initialState, action);

      expect(state.error).toBe('Failed to load now playing movies');
    });
  });
});