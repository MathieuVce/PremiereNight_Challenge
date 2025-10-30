import { HomeScreenProps } from '@/navigation/types';
import React, {useEffect, useMemo, useCallback, useState} from 'react';
import {ScrollView, StyleSheet, RefreshControl, View, Text, TextInput} from 'react-native';
import {Movie} from '@/api/tmdb';
import {selectGenres, useAppDispatch, useAppSelector} from '@/store';
import {
  moviesSlice,
  selectNowPlayingMovies,
  selectPopularMovies,
  selectMovies,
} from '@/store';
import {MovieCarousel} from '@/components/movies';
import {LoadingSpinner} from '@/components/common';
import {Colors, FontWeights, Spacing} from '@/theme';
import { ROUTES } from '@/navigation/staticKeys';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
 const dispatch = useAppDispatch();

  // Select data from Redux store
  const nowPlayingMovies = useAppSelector(selectNowPlayingMovies);
  const popularMovies = useAppSelector(selectPopularMovies);
  const genres = useAppSelector(selectGenres);
  const {loading, error} = useAppSelector(selectMovies);

  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchMovie, setSearchMovie] = useState<string>('');

  /**
   * Load movies on component mount
   */
  useEffect(() => {
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    /**
   * Load all movie categories and genres
   */
  const loadMovies = async () => {
    try {
      await Promise.all([
        dispatch(moviesSlice.loadNowPlayingMovies(1)).unwrap(),
        dispatch(moviesSlice.loadPopularMovies(1)).unwrap(),
        dispatch(moviesSlice.loadGenres()).unwrap(),
      ]);
    } catch (err) {
      console.error('Failed to load movies:', err);
    } finally {
      setIsInitialLoad(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMovies();
    setRefreshing(false);
  };

  /**
   * Navigate to movie detail screen
   */
  const handleMoviePress = (movie: Movie) => {
    navigation.navigate(ROUTES.SCREEN_MOVIE_DETAILS, {movieId: movie.id});
  };

 /**
   * Filter movies by search query (title or genre)
   */
  const filterMovies = useCallback((movies: Movie[]): Movie[] => {
    if (!searchMovie.trim()) {
      return movies;
    }

    const query = searchMovie.toLowerCase().trim();

    return movies.filter(movie => {
      // Filter by title
      if (movie.title.toLowerCase().includes(query)) {
        return true;
      }

      // Filter by genre name
      const movieGenres = genres
        .filter(genre => movie.genre_ids.includes(genre.id))
        .map(genre => genre.name.toLowerCase());

      return movieGenres.some(genreName => genreName.includes(query));
    });
  }, [searchMovie, genres]);

  /**
   * Memoized filtered movie lists
   */
  const filteredNowPlayingMovies = useMemo(
    () => filterMovies(nowPlayingMovies),
    [nowPlayingMovies, filterMovies],
  );

  const filteredPopularMovies = useMemo(
    () => filterMovies(popularMovies),
    [popularMovies, filterMovies],
  );

  /**
   * Show loading spinner on initial load
   */
  if (isInitialLoad && loading) {
    return <LoadingSpinner fullScreen message="Loading movies..." />;
  }

  /**
   * Show error state
   */
  if (error && !refreshing) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load movies</Text>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title or genre..."
          placeholderTextColor={Colors.text.secondary}
          value={searchMovie}
          onChangeText={setSearchMovie}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }>
        {/* Now Playing Section */}
        {filteredNowPlayingMovies.length > 0 && (
          <MovieCarousel
            title="Now Playing"
            movies={filteredNowPlayingMovies}
            onMoviePress={handleMoviePress}
          />
        )}

        {/* Popular Section */}
        {filteredPopularMovies.length > 0 && (
          <MovieCarousel
            title="Popular"
            movies={filteredPopularMovies}
            onMoviePress={handleMoviePress}
          />
        )}

         {/* No Results Message */}
        {searchMovie.trim() &&
          filteredNowPlayingMovies.length === 0 &&
          filteredPopularMovies.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No movies found</Text>
              <Text style={styles.noResultsSubtext}>
                Try a different search term
              </Text>
            </View>
          )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing.xs,
    backgroundColor: Colors.background,
  },
  searchInput: {
    height: 44,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: Spacing.base,
    fontSize: 16,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingVertical: Spacing.base,
  },
    errorContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  errorText: {
    color: Colors.error,
    fontSize: 18,
    fontWeight: FontWeights.semibold,

    marginBottom: Spacing.sm,
  },
  errorMessage: {
    color: Colors.text.secondary,
    fontSize: 14,
    textAlign: 'center',
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  noResultsText: {
    color: Colors.text.primary,
    fontSize: 18,
    fontWeight: FontWeights.semibold,

    marginBottom: Spacing.xs,
  },
  noResultsSubtext: {
    color: Colors.text.secondary,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen;