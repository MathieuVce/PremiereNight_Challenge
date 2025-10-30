import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from 'react-native';

import { ROUTES } from '@/navigation/staticKeys';
import { WatchlistScreenProps } from '@/navigation/types';

import {LoadingSpinner} from '@/components/common';
import {Colors, Typography, Spacing, BorderRadius, FontWeights} from '@/theme';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * Watchlist Screen
 * Displays the user's saved movies with options to view or remove.
 */

const watchlistItems = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  title: `Tmp Movie Name ${i + 1}`,
  release_date: "2025-10-30",
  overview:
    'This is a short description of the movie plot. It can be very long or very very short depending on the movie.',
  poster_path: "",
})); // TODO replace with actual watchlist items

const WatchlistScreen: React.FC<WatchlistScreenProps> = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * TODO load watchlist
   */
  // useEffect(() => {
  // }, []);

  /**
   * Navigate to movie detail
   */
  const handleMoviePress = () => {
    navigation.navigate(ROUTES.SCREEN_MOVIE_DETAILS);
  };

  /**
   * Render each watchlist item
   */
  const renderItem: ListRenderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleMoviePress()}
        activeOpacity={0.8}>
        {/* Poster */}
        {item.poster_path ? (
          <Image source={{uri: item.poster_path}} style={styles.img} />
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
          onPress={() => {}} // TODO implement remove from watchlist
          >
          <Icon name="close" size={20} color={Colors.text.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  /**
   * Extract unique key for each item
   */
  const keyExtractor = (item) => item.id.toString();

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
    <View style={styles.container}>
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
    </View>
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
