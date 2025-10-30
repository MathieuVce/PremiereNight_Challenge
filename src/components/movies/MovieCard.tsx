import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Typography, Spacing, BorderRadius, Shadows, scale} from '@/theme';
import { buildImageUrl, Movie } from '@/api/tmdb';

/**
 * MovieCard Component
 * Displays a movie poster with title in a card format.
 */

export interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  width?: number;

  /** Test ID for testing */
  testID?: string;
}

/**
 * Default card dimensions aspect ratio (2:3)
 */
const DEFAULT_WIDTH = scale(140);
const ASPECT_RATIO = 1.5;

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  width = DEFAULT_WIDTH,
  testID,
}) => {
  const height = width * ASPECT_RATIO;
  const imageUrl = buildImageUrl(movie.poster_path, 'w342');

  return (
    <TouchableOpacity
      style={[styles.container, {width}]}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
      testID={testID}>
      <View style={[styles.posterContainer, {width, height}]}>
        {imageUrl ? (
          <Image
            source={{uri: imageUrl}}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          // Fallback for missing image
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        {movie.release_date && (
          <Text style={styles.year}>
            {new Date(movie.release_date).getFullYear()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: Spacing.md,
  },
  posterContainer: {
    borderRadius: BorderRadius.base,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceLight,
    ...Shadows.sm,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  infoContainer: {
    marginTop: Spacing.sm,
  },
  title: {
    ...Typography.labelSmall,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  year: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
});

export default MovieCard;
