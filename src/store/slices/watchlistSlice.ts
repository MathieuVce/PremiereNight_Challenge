import {Movie} from '@/api/tmdb';
import {WatchlistState, WatchlistItem} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

/**
 * This slice manages the user's watchlist (saved movies).
 */

const WATCHLIST_STORAGE_KEY = '@premiere_night:watchlist';

const initialState: WatchlistState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * Load watchlist from AsyncStorage
 * Called on app startup to restore saved watchlist
 */
export const loadWatchlist = createAsyncThunk('watchlist/load', async () => {
  try {
    const data = await AsyncStorage.getItem(WATCHLIST_STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as WatchlistItem[];
    }
    return [];
  } catch (error) {
    console.error('Failed to load watchlist:', error);
    return [];
  }
});

/**
 * Save watchlist to AsyncStorage
 */
const saveWatchlistToStorage = async (items: WatchlistItem[]) => {
  try {
    await AsyncStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save watchlist:', error);
  }
};

/**
 * Watchlist slice
 */
const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    /**
     * Add a movie to watchlist
     */
    addToWatchlist: (state, action: PayloadAction<Movie>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        const watchlistItem: WatchlistItem = {
          ...action.payload,
          addedAt: Date.now(),
        };
        state.items.unshift(watchlistItem); // Add to start of list
        saveWatchlistToStorage(state.items);
      }
    },

    /**
     * Remove a movie from watchlist by ID
     */
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveWatchlistToStorage(state.items);
    },

    clearWatchlist: state => {
      state.items = [];
      saveWatchlistToStorage([]);
    },

    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Load watchlist
    builder
      .addCase(loadWatchlist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadWatchlist.fulfilled,
        (state, action: PayloadAction<WatchlistItem[]>) => {
          state.loading = false;
          state.items = action.payload;
        },
      )
      .addCase(loadWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load watchlist';
      });
  },
});

export const {addToWatchlist, removeFromWatchlist, clearWatchlist, clearError} =
  watchlistSlice.actions;

export default watchlistSlice.reducer;
