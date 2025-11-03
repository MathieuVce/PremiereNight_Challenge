import watchlistReducer, {
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
  loadWatchlist,
} from '@/store/slices/watchlistSlice';
import {WatchlistState, WatchlistItem} from '@/store/types';
import {Movie} from '@/api/tmdb';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('Watchlist Slice - Simple Tests', () => {

  const initialState: WatchlistState = {
    items: [],
    loading: false,
    error: null,
  };

  // Mock movie
  const mockMovie: Movie = {
    id: 1,
    title: 'Movie1',
    poster_path: '/movie1.jpg',
    overview: 'A mind-bending thriller',
    vote_average: 8.8,
    release_date: '2010-01-01',
    genre_ids: [28, 878, 53],
    backdrop_path: '/backdrop.jpg',
    original_language: 'en',
    vote_count: 25000,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = watchlistReducer(undefined, {type: 'unknown'});

      expect(state).toEqual(initialState);
    });

    it('should have empty items array by default', () => {
      const state = watchlistReducer(undefined, {type: 'unknown'});

      expect(state.items).toEqual([]);
    });

    it('should not be loading initially', () => {
      const state = watchlistReducer(undefined, {type: 'unknown'});

      expect(state.loading).toBe(false);
    });

    it('should have no error initially', () => {
      const state = watchlistReducer(undefined, {type: 'unknown'});

      expect(state.error).toBeNull();
    });
  });

  describe('Add to Watchlist', () => {
    it('should add a movie to watchlist', () => {
      const state = watchlistReducer(initialState, addToWatchlist(mockMovie));

      expect(state.items.length).toBe(1);
      expect(state.items[0].id).toBe(mockMovie.id);
      expect(state.items[0].title).toBe(mockMovie.title);
    });

    it('should add movie at the beginning of the list', () => {
      const movie1 = {...mockMovie, id: 1, title: 'Movie 1'};
      const movie2 = {...mockMovie, id: 2, title: 'Movie 2'};

      let state = watchlistReducer(initialState, addToWatchlist(movie1));
      state = watchlistReducer(state, addToWatchlist(movie2));

      expect(state.items[0].id).toBe(2); // Le plus récent en premier
      expect(state.items[1].id).toBe(1);
    });

    it('should not add duplicate movies', () => {
      let state = watchlistReducer(initialState, addToWatchlist(mockMovie));
      state = watchlistReducer(state, addToWatchlist(mockMovie));

      expect(state.items.length).toBe(1);
    });

    it('should add addedAt timestamp', () => {
      const state = watchlistReducer(initialState, addToWatchlist(mockMovie));

      expect(state.items[0].addedAt).toBeDefined();
      expect(typeof state.items[0].addedAt).toBe('number');
    });

    it('should call AsyncStorage.setItem when adding', () => {
      watchlistReducer(initialState, addToWatchlist(mockMovie));

      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('Remove from Watchlist', () => {
    it('should remove a movie from watchlist', () => {
      const stateWithMovie = {
        ...initialState,
        items: [{...mockMovie, addedAt: Date.now()}],
      };

      const state = watchlistReducer(stateWithMovie, removeFromWatchlist(mockMovie.id));

      expect(state.items.length).toBe(0);
    });

    it('should remove only the specified movie', () => {
      const movie1 = {...mockMovie, id: 1, title: 'Movie 1', addedAt: Date.now()};
      const movie2 = {...mockMovie, id: 2, title: 'Movie 2', addedAt: Date.now()};

      const stateWithMovies = {
        ...initialState,
        items: [movie1, movie2],
      };

      const state = watchlistReducer(stateWithMovies, removeFromWatchlist(1));

      expect(state.items.length).toBe(1);
      expect(state.items[0].id).toBe(2);
    });

    it('should call AsyncStorage.setItem when removing', () => {
      const stateWithMovie = {
        ...initialState,
        items: [{...mockMovie, addedAt: Date.now()}],
      };

      watchlistReducer(stateWithMovie, removeFromWatchlist(mockMovie.id));

      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    it('should not crash when removing non-existent movie', () => {
      const state = watchlistReducer(initialState, removeFromWatchlist(999));

      expect(state.items.length).toBe(0);
    });
  });

  describe('Clear Watchlist', () => {
    it('should clear all items from watchlist', () => {
      const movie1 = {...mockMovie, id: 1, addedAt: Date.now()};
      const movie2 = {...mockMovie, id: 2, addedAt: Date.now()};

      const stateWithMovies = {
        ...initialState,
        items: [movie1, movie2],
      };

      const state = watchlistReducer(stateWithMovies, clearWatchlist());

      expect(state.items).toEqual([]);
      expect(state.items.length).toBe(0);
    });

    it('should call AsyncStorage.setItem with empty array', () => {
      const stateWithMovies = {
        ...initialState,
        items: [{...mockMovie, addedAt: Date.now()}],
      };

      watchlistReducer(stateWithMovies, clearWatchlist());

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@premiere_night:watchlist',
        JSON.stringify([])
      );
    });
  });


  describe('Load Watchlist', () => {
    it('should set loading to true when loading', () => {
      const action = loadWatchlist.pending('');
      const state = watchlistReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should load watchlist from storage', () => {
      const mockItems: WatchlistItem[] = [
        {...mockMovie, id: 1, addedAt: 1234567890},
        {...mockMovie, id: 2, addedAt: 1234567891},
      ];

      const action = loadWatchlist.fulfilled(mockItems, '');
      const state = watchlistReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockItems);
      expect(state.items.length).toBe(2);
    });

    it('should load empty array when no data', () => {
      const action = loadWatchlist.fulfilled([], '');
      const state = watchlistReducer(initialState, action);

      expect(state.items).toEqual([]);
    });

    it('should set error when loading fails', () => {
      const action = loadWatchlist.rejected(
        new Error('Failed to load'),
        ''
      );
      const state = watchlistReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to load');
    });

    it('should use default error message when error has no message', () => {
      const action = {
        type: loadWatchlist.rejected.type,
        error: {},
      } as any;

      const state = watchlistReducer(initialState, action);

      expect(state.error).toBe('Failed to load watchlist');
    });
  });

  describe('Realistic Scenarios', () => {
    it('should add multiple movies then remove one', () => {
      const movie1 = {...mockMovie, id: 1, title: 'Movie 1'};
      const movie2 = {...mockMovie, id: 2, title: 'Movie 2'};
      const movie3 = {...mockMovie, id: 3, title: 'Movie 3'};

      let state = watchlistReducer(initialState, addToWatchlist(movie1));
      state = watchlistReducer(state, addToWatchlist(movie2));
      state = watchlistReducer(state, addToWatchlist(movie3));

      expect(state.items.length).toBe(3);

      state = watchlistReducer(state, removeFromWatchlist(2));

      expect(state.items.length).toBe(2);
      expect(state.items.find(item => item.id === 2)).toBeUndefined();
    });

    it('should toggle movie in watchlist (add then remove)', () => {
      // Add
      let state = watchlistReducer(initialState, addToWatchlist(mockMovie));
      expect(state.items.length).toBe(1);

      // Remove
      state = watchlistReducer(state, removeFromWatchlist(mockMovie.id));
      expect(state.items.length).toBe(0);
    });

    it('should preserve other movies when removing one', () => {
      const movie1 = {...mockMovie, id: 1, title: 'Keep Me', addedAt: Date.now()};
      const movie2 = {...mockMovie, id: 2, title: 'Remove Me', addedAt: Date.now()};

      const stateWithMovies = {
        ...initialState,
        items: [movie1, movie2],
      };

      const state = watchlistReducer(stateWithMovies, removeFromWatchlist(2));

      expect(state.items.length).toBe(1);
      expect(state.items[0].title).toBe('Keep Me');
    });

    it('should handle add, remove, clear sequence', () => {
      let state = watchlistReducer(initialState, addToWatchlist(mockMovie));
      expect(state.items.length).toBe(1);

      state = watchlistReducer(state, removeFromWatchlist(mockMovie.id));
      expect(state.items.length).toBe(0);

      state = watchlistReducer(state, addToWatchlist(mockMovie));
      expect(state.items.length).toBe(1);

      state = watchlistReducer(state, clearWatchlist());
      expect(state.items.length).toBe(0);
    });
  });

  describe('Check if Movie in Watchlist', () => {
    it('should find movie in watchlist', () => {
      const stateWithMovie = {
        ...initialState,
        items: [{...mockMovie, addedAt: Date.now()}],
      };

      const isInWatchlist = stateWithMovie.items.some(
        item => item.id === mockMovie.id
      );

      expect(isInWatchlist).toBe(true);
    });

    it('should not find movie not in watchlist', () => {
      const isInWatchlist = initialState.items.some(
        item => item.id === 999
      );

      expect(isInWatchlist).toBe(false);
    });
  });
});