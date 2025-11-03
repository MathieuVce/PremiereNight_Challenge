import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import { ROUTES } from '@/navigation/staticKeys';
import { WatchlistScreenProps } from '@/navigation/types';

import {LoadingSpinner} from '@/components/common';
import {Colors, Typography, Spacing, BorderRadius, FontWeights} from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { selectWatchlistItems, useAppDispatch, useAppSelector, WatchlistItem, watchlistSlice } from '@/store';
import { buildImageUrl } from '@/api/tmdb';

/**
 * Watchlist Screen
 * Displays the user's saved movies with options to view or remove.
 */

const WatchlistScreen: React.FC<WatchlistScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const watchlistItems = useAppSelector(selectWatchlistItems);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Load watchlist on mount
   */
  useEffect(() => {
    loadWatchlistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Load watchlist from storage
   */
  const loadWatchlistData = async () => {
    try {
      await dispatch(watchlistSlice.loadWatchlist()).unwrap();
    } catch (err) {
      console.error('Failed to load watchlist:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigate to movie detail
   */
  const handleMoviePress = (movieId: number) => {
    navigation.navigate(ROUTES.SCREEN_MOVIE_DETAILS, {movieId});
  };

  /**
   * Remove movie from watchlist
   */
  const handleRemove = (movieId: number) => {
    dispatch(watchlistSlice.removeFromWatchlist(movieId));
  };

  /**
   * Render each watchlist item
   */
  const renderItem: ListRenderItem<WatchlistItem> = ({item}) => {
    const posterUrl = buildImageUrl(item.poster_path, 'w185');

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleMoviePress(item.id)}
        activeOpacity={0.8}>
        {/* Poster */}
        {posterUrl ? (
          <Image source={{uri: posterUrl}} style={styles.img} />
        ) : (
          <View style={styles.imgPlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}

        {/* Movie Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.overview} numberOfLines={3}>
            {item.overview}
          </Text>
          {item.release_date && (
            <Text style={styles.year}>
              {new Date(item.release_date).getFullYear()}
            </Text>
          )}
        </View>

        {/* Remove Button */}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemove(item.id)}
          >
          <Icon name="close" size={20} color={Colors.text.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  /**
   * Extract unique key for each item
   */
  const keyExtractor = (item: WatchlistItem) => item.id.toString();

  /**
   * Empty component
   */
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Your watchlist is empty</Text>
      <Text style={styles.emptySubtext}>
        Browse movies and add them to your watchlist
      </Text>
    </View>
  );

  /**
   * Show loading spinner on initial load
   */
  if (loading) {
    return <LoadingSpinner fullScreen message="Loading watchlist..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={watchlistItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.listContent,
          watchlistItems.length === 0 && styles.listContentEmpty,
        ]}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Spacing.base,
  },
  listContentEmpty: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.base,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'flex-start',
  },
  img: {
    width: 80,
    height: 120,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceLight,
  },
  imgPlaceholder: {
    width: 80,
    height: 120,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  infoContainer: {
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.md,
  },
  title: {
    ...Typography.h4,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  overview: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  year: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: Colors.text.primary,
    fontSize: 20,
    fontWeight: FontWeights.semibold,
    lineHeight: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emptyText: {
    ...Typography.h3,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
});

export default WatchlistScreen;
