import React from 'react';
import {View, Text, FlatList, StyleSheet, ListRenderItem} from 'react-native';
import {Colors, Typography, Spacing} from '@/theme';
import MovieCard from './MovieCard';
import { Movie } from '@/api/tmdb';

/**
 * MovieCarousel Component
 * Displays a horizontal scrolling list of movies with a section title.
 */

export interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  onMoviePress: (movie: Movie) => void;
  onEndReached?: () => void;
  loading?: boolean;

  /** Test ID for testing */
  testID?: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title,
  movies,
  onMoviePress,
  onEndReached,
  testID,
}) => {

  const renderItem: ListRenderItem<Movie> = ({item}) => (
    <MovieCard movie={item} onPress={onMoviePress} testID={`movie-card-${item.id}`} />
  );

  /**
   * Extract unique key for each item
   */
  const keyExtractor = (item: Movie) => item.id.toString();

  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.title}>{title}</Text>

      {/* Horizontal Movie List */}
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.base,
    paddingHorizontal: Spacing.base,
  },
  listContent: {
    paddingHorizontal: Spacing.base,
  },
});

export default MovieCarousel;
