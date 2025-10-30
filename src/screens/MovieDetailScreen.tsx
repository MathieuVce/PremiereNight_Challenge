import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { MovieDetailScreenProps } from '@/navigation/types';

import {Button, LoadingSpinner} from '@/components/common';
import {Colors, Typography, Spacing, BorderRadius, FontWeights} from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * Movie Detail Screen
 * Displays detailed information about a selected movie.
 */

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BACKDROP_HEIGHT = SCREEN_WIDTH * 0.56; // 16:9 aspect ratio

const MovieDetailScreen: React.FC<MovieDetailScreenProps> = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const isInWatchlist = false; // TODO determine if movie is in watchlist

  // TODO replace with actual movie data
  const movie = {
    id: 1,
    title: 'Tmp Movie Title',
    release_date: '2025-10-30',
    runtime: 120,
    vote_average: 7.8,
    vote_count: 1500,
    genres: [{id: 1, name: 'Action'}, {id: 2, name: 'Adventure'}],
    backdrop_path: '',
    poster_path: '',
    tagline: 'An epic rea ct native application.',
    overview:
      'This is a short descrition of the movie plot. It can be very long or very very short depending on the movie. It gives an overview of what the movie is about. It can be 2-3 lines long or less or more...',
    original_language: 'en',
  }

  /**
   * TODO Load movie details
   */
  // useEffect(() => {
  // }, []);

  /**
   * Show loading spinner on initial load
   */
  if (loading) {
    return <LoadingSpinner fullScreen message="Loading movie details..." />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Backdrop Image */}
      <Image
        source={{uri: movie.backdrop_path}}
        style={styles.backdropImg}
        resizeMode="cover"
      />

      <View style={styles.content}>
        {/* Poster and Basic Info */}
        <View style={styles.headerSection}>
          <Image
            source={{uri: movie.poster_path}}
            style={styles.movieImg}
            resizeMode="cover"
          />

          <View style={styles.headerInfo}>
            <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.yearRow}>
              <Text style={styles.rowText}>
                {new Date(movie.release_date).getFullYear()}
              </Text>
              {movie.runtime && (
                <Text style={styles.rowText}> - {movie.runtime} min</Text>
              )}
            </View>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={24} color={Colors.secondary} />
              <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
              <Text style={styles.voteCount}>({movie.vote_count} votes)</Text>
            </View>
          </View>
        </View>

        {/* Genres */}
        {movie.genres.length > 0 && (
          <View style={styles.genresContainer}>
            {movie.genres.map(genre => (
              <View key={genre.id} style={styles.genreChip}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Watchlist Button */}
        <Button
          title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          onPress={() => {}} // TODO implement watchlist functionality
          variant={isInWatchlist ? 'outline' : 'primary'}
          style={styles.watchlistButton}
        />

        {/* Tagline */}
        {movie.tagline && (
          <Text style={styles.tagline}>"{movie.tagline}"</Text>
        )}

        {/* Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>

        {movie.original_language && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Language:</Text>
            <Text style={styles.infoValue}>
              {movie.original_language.toUpperCase()}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backdropImg: {
    width: SCREEN_WIDTH,
    height: BACKDROP_HEIGHT,
  },
  content: {
    padding: Spacing.base,
  },
  headerSection: {
    flexDirection: 'row',
    marginTop: -60, // Overlap backdrop
    marginBottom: Spacing.base,
  },
  movieImg: {
    width: 120,
    height: 180,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.surfaceLight,
  },
  headerInfo: {
    flex: 1,
    marginLeft: Spacing.base,
    justifyContent: 'flex-end',
  },
  title: {
    ...Typography.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  yearRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  rowText: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...Typography.h2,
    color: Colors.secondary,
    fontWeight: FontWeights.semibold,
    paddingTop: Spacing.xs,
  },
  voteCount: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
    paddingTop: Spacing.xs,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.base,
  },
  genreChip: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  genreText: {
    ...Typography.labelSmall,
    color: Colors.text.secondary,
  },
  watchlistButton: {
    marginBottom: Spacing.base,
  },
  tagline: {
    ...Typography.body,
    color: Colors.text.secondary,
    fontStyle: 'italic',
    marginBottom: Spacing.base,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.base,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  overview: {
    ...Typography.body,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  infoLabel: {
    ...Typography.label,
    color: Colors.text.secondary,
    width: 100,
  },
  infoValue: {
    ...Typography.body,
    color: Colors.text.primary,
    flex: 1,
  },
});

export default MovieDetailScreen;
