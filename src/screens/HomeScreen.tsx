import React, { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

import { MovieCarousel } from '@/components/movies';
import { LoadingSpinner } from '@/components/common';

import { ROUTES } from '@/navigation/staticKeys';
import { HomeScreenProps } from '@/navigation/types';

import { Colors, Spacing } from '@/theme';

const filteredNowPlayingMovies = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Tmp Movie Name Now Playing ${i + 1}`,
  release_date: "2025-10-30",
  poster_path: "" }));
// TODO replace with actual filtered movies

const filteredPopularMovies = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Tmp Movie Name Popular ${i + 1}`,
  release_date: "2025-10-30",
  poster_path: "" }));
// TODO replace with actual filtered movies


const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchMovie, setSearchMovie] = useState<string>('');

  // TODO fetch and load movies
  // useEffect(() => {
  // }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // TODO call load movies function
    setRefreshing(false);
  };

  /**
   * Navigate to movie detail screen
   */
  const handleMoviePress = () => {
    navigation.navigate(ROUTES.SCREEN_MOVIE_DETAILS); // TODO pass movie details as params and type movie
  };

  // TODO implement movie list and search function
  // const filterMovies = useCallback()...

  /**
   * Show loading spinner on initial load
   */
  if (refreshing) {
    return <LoadingSpinner fullScreen message="Loading movies..." />;
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
});

export default HomeScreen;