import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MovieCarousel from '@/components/movies/MovieCarousel';

describe('MovieCarousel', () => {
  const mockMovies = [
    {
      id: 1,
      title: 'Movie 1',
      poster_path: '/test1.jpg',
      backdrop_path: '/backdrop1.jpg',
      vote_count: 100,
      original_language: 'en',
      overview: 'Overview 1',
      vote_average: 8.5,
      release_date: '2025-01-01',
      genre_ids: [28],
    },
    {
      id: 2,
      title: 'Movie 2',
      poster_path: '/test2.jpg',
      backdrop_path: '/backdrop2.jpg',
      vote_count: 100,
      original_language: 'en',
      overview: 'Overview 2',
      vote_average: 7.5,
      release_date: '2024-01-01',
      genre_ids: [12],
    },
  ];

  const mockOnMoviePress = jest.fn();
  const mockOnEndReached = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with movies', () => {
    const {getByText} = render(
      <MovieCarousel
        title="Now Playing"
        movies={mockMovies}
        onMoviePress={mockOnMoviePress}
      />
    );

    expect(getByText('Now Playing')).toBeTruthy();
  });

  it('renders load more button when onEndReached is provided', () => {
    const {getByText} = render(
      <MovieCarousel
        title="Popular"
        movies={mockMovies}
        onMoviePress={mockOnMoviePress}
        onEndReached={mockOnEndReached}
      />
    );

    expect(getByText('Load More')).toBeTruthy();
  });

  it('calls onEndReached when load more button is pressed', () => {
    const {getByText} = render(
      <MovieCarousel
        title="Popular"
        movies={mockMovies}
        onMoviePress={mockOnMoviePress}
        onEndReached={mockOnEndReached}
      />
    );

    fireEvent.press(getByText('Load More'));
    expect(mockOnEndReached).toHaveBeenCalledTimes(1);
  });

  it('shows loading indicator when loading prop is true', () => {
    const {queryByText} = render(
      <MovieCarousel
        title="Popular"
        movies={mockMovies}
        onMoviePress={mockOnMoviePress}
        onEndReached={mockOnEndReached}
        loading={true}
      />
    );

    expect(queryByText('Load More')).toBeNull();
  });
});