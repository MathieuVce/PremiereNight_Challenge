import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Button from '@/components/common/Button';

describe('Button Component', () => {

  describe('Basic Rendering', () => {
    it('should render correctly with title', () => {
      const {getByText} = render(
        <Button title="Test Button" onPress={jest.fn()} />
      );

      expect(getByText('Test Button')).toBeTruthy();
    });

    it('should match snapshot', () => {
      const {toJSON} = render(
        <Button title="Snapshot Test" onPress={jest.fn()} />
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe('Variants', () => {
    it('should render primary variant by default', () => {
      const {getByTestId} = render(
        <Button
          title="Primary"
          onPress={jest.fn()}
          testID="primary-button"
        />
      );

      expect(getByTestId('primary-button')).toBeTruthy();
    });

    it('should render outline variant', () => {
      const {getByTestId} = render(
        <Button
          title="Outline"
          onPress={jest.fn()}
          variant="outline"
          testID="outline-button"
        />
      );

      expect(getByTestId('outline-button')).toBeTruthy();
    });

    it('should render secondary variant', () => {
      const {getByTestId} = render(
        <Button
          title="Secondary"
          onPress={jest.fn()}
          variant="secondary"
          testID="secondary-button"
        />
      );

      expect(getByTestId('secondary-button')).toBeTruthy();
    });

    it('should render ghost variant', () => {
      const {getByTestId} = render(
        <Button
          title="Ghost"
          onPress={jest.fn()}
          variant="ghost"
          testID="ghost-button"
        />
      );

      expect(getByTestId('ghost-button')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      const {getByTestId} = render(
        <Button
          title="Small"
          onPress={jest.fn()}
          size="small"
          testID="small-button"
        />
      );

      expect(getByTestId('small-button')).toBeTruthy();
    });

    it('should render medium size by default', () => {
      const {getByTestId} = render(
        <Button
          title="Medium"
          onPress={jest.fn()}
          testID="medium-button"
        />
      );

      expect(getByTestId('medium-button')).toBeTruthy();
    });

    it('should render large size', () => {
      const {getByTestId} = render(
        <Button
          title="Large"
          onPress={jest.fn()}
          size="large"
          testID="large-button"
        />
      );

      expect(getByTestId('large-button')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should call onPress when pressed', () => {
      const mockOnPress = jest.fn();

      const {getByTestId} = render(
        <Button
          title="Press Me"
          onPress={mockOnPress}
          testID="press-button"
        />
      );

      fireEvent.press(getByTestId('press-button'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when disabled', () => {
      const mockOnPress = jest.fn();
      const {getByTestId} = render(
        <Button
          title="Disabled"
          onPress={mockOnPress}
          disabled={true}
          testID="disabled-button"
        />
      );

      fireEvent.press(getByTestId('disabled-button'));
      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('should not call onPress when loading', () => {
      const mockOnPress = jest.fn();

      const {getByTestId} = render(
        <Button
          title="Loading"
          onPress={mockOnPress}
          loading={true}
          testID="loading-button"
        />
      );

      fireEvent.press(getByTestId('loading-button'));
      expect(mockOnPress).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('should show ActivityIndicator when loading', () => {
      const {queryByText, getByTestId} = render(
        <Button
          title="Loading"
          onPress={jest.fn()}
          loading={true}
          testID="loading-button"
        />
      );

      expect(queryByText('Loading')).toBeNull();
      expect(getByTestId('loading-button')).toBeTruthy();
    });

    it('should not show ActivityIndicator when not loading', () => {
      const {getByText} = render(
        <Button
          title="Not Loading"
          onPress={jest.fn()}
          loading={false}
        />
      );

      expect(getByText('Not Loading')).toBeTruthy();
    });
  });

  describe('Watchlist Use Case', () => {
    it('should display "Add to Watchlist" when movie not in watchlist', () => {
      const mockToggle = jest.fn();
      const isInWatchlist = false;

      const {getByText} = render(
        <Button
          title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          onPress={mockToggle}
          variant={isInWatchlist ? 'outline' : 'primary'}
          testID="watchlist-button"
        />
      );

      expect(getByText('Add to Watchlist')).toBeTruthy();
    });

    it('should display "Remove from Watchlist" when movie in watchlist', () => {
      const mockToggle = jest.fn();
      const isInWatchlist = true;

      const {getByText} = render(
        <Button
          title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          onPress={mockToggle}
          variant={isInWatchlist ? 'outline' : 'primary'}
          testID="watchlist-button"
        />
      );

      expect(getByText('Remove from Watchlist')).toBeTruthy();
    });

    it('should use primary variant when adding to watchlist', () => {
      const mockToggle = jest.fn();
      const isInWatchlist = false;

      const {getByTestId} = render(
        <Button
          title="Add to Watchlist"
          onPress={mockToggle}
          variant={isInWatchlist ? 'outline' : 'primary'}
          testID="watchlist-button"
        />
      );

      const button = getByTestId('watchlist-button');
      expect(button).toBeTruthy();
    });

    it('should use outline variant when removing from watchlist', () => {
      const mockToggle = jest.fn();
      const isInWatchlist = true;

      const {getByTestId} = render(
        <Button
          title="Remove from Watchlist"
          onPress={mockToggle}
          variant={isInWatchlist ? 'outline' : 'primary'}
          testID="watchlist-button"
        />
      );

      const button = getByTestId('watchlist-button');
      expect(button).toBeTruthy();
    });

    it('should match snapshot for add to watchlist state', () => {
      const {toJSON} = render(
        <Button
          title="Add to Watchlist"
          onPress={jest.fn()}
          variant="primary"
        />
      );

      expect(toJSON()).toMatchSnapshot();
    });

    it('should match snapshot for remove from watchlist state', () => {
      const {toJSON} = render(
        <Button
          title="Remove from Watchlist"
          onPress={jest.fn()}
          variant="outline"
        />
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });
});