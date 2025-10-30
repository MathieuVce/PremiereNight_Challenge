import React, {useEffect, useState} from 'react';
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
import { moviesSlice, selectIsInWatchlist, selectMovieDetails, useAppDispatch, useAppSelector, watchlistSlice } from '@/store';
import { buildBackdropUrl, buildImageUrl } from '@/api/tmdb';

/**
 * Movie Detail Screen
 * Displays detailed information about a selected movie.
 */

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BACKDROP_HEIGHT = SCREEN_WIDTH * 0.56; // 16:9 aspect ratio

const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({route}) => {
  const dispatch = useAppDispatch();
  const {movieId} = route.params;

  // Get movie details from store
  const movie = useAppSelector(selectMovieDetails(movieId));
  const isInWatchlist = useAppSelector(selectIsInWatchlist(movieId));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load movie details on mount
   */
  useEffect(() => {
    if (!movie) {
      loadDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  /**
   * Fetch movie details
   */
  const loadDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(moviesSlice.loadMovieDetails(movieId)).unwrap();
    } catch (err) {
      setError('Failed to load movie details');
      console.error('Failed to load movie details:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle watchlist status
   */
  const handleWatchlistToggle = () => {
    if (!movie) {
      return;
    }

    if (isInWatchlist) {
      dispatch(watchlistSlice.removeFromWatchlist(movieId));
    } else {
      // Convert MovieDetails to Movie for watchlist
      dispatch(watchlistSlice.addToWatchlist({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        genre_ids: movie.genres.map(g => g.id),
        original_language: movie.original_language,
      }));
    }
  };

  /**
   * Show loading spinner on initial load
   */
  if (loading || !movie) {
    return <LoadingSpinner fullScreen message="Loading movie details..." />;
  }

  /**
   * Show error state
   */
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={loadDetails} />
      </View>
    );
  }

  const backdropUrl = buildBackdropUrl(movie.backdrop_path, 'w780');
  const posterUrl = buildImageUrl(movie.poster_path, 'w500');

  return (
    <ScrollView style={styles.container}>
      {/* Backdrop Image */}
      {backdropUrl && (
        <Image
          source={{uri: backdropUrl}}
          style={styles.backdropImg}
          resizeMode="cover"
        />
      )}


      <View style={styles.content}>
        {/* Poster and Basic Info */}
        <View style={styles.headerSection}>
          {posterUrl && (
            <Image
              source={{uri: posterUrl}}
              style={styles.movieImg}
              resizeMode="cover"
            />
          )}

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
          onPress={handleWatchlistToggle}
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
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  errorText: {
    ...Typography.body,
    color: Colors.error,
    marginBottom: Spacing.base,
    textAlign: 'center',
  },
});

export default MovieDetailScreen;
