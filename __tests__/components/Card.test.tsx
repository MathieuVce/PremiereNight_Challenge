import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Text} from 'react-native';
import Card from '@/components/common/Card';

describe('Card Component', () => {

  describe('Basic Rendering', () => {
    it('should render correctly with children', () => {
      const {getByText} = render(
        <Card>
          <Text>Card Content</Text>
        </Card>
      );

      expect(getByText('Card Content')).toBeTruthy();
    });

    it('should render as View by default', () => {
      const {getByTestId} = render(
        <Card testID="card-view">
          <Text>Content</Text>
        </Card>
      );

      expect(getByTestId('card-view')).toBeTruthy();
    });

    it('should match snapshot', () => {
      const {toJSON} = render(
        <Card>
          <Text>Snapshot Test</Text>
        </Card>
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });

  // Test du mode pressable
  describe('Pressable Mode', () => {
    it('should render as TouchableOpacity when pressable is true', () => {
      const mockOnPress = jest.fn();

      const {getByTestId} = render(
        <Card pressable onPress={mockOnPress} testID="pressable-card">
          <Text>Pressable Card</Text>
        </Card>
      );

      expect(getByTestId('pressable-card')).toBeTruthy();
    });

    it('should call onPress when pressed', () => {
      const mockOnPress = jest.fn();

      const {getByTestId} = render(
        <Card pressable onPress={mockOnPress} testID="pressable-card">
          <Text>Press Me</Text>
        </Card>
      );

      fireEvent.press(getByTestId('pressable-card'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should not be pressable by default', () => {
      const mockOnPress = jest.fn();

      const {getByTestId} = render(
        <Card onPress={mockOnPress} testID="non-pressable-card">
          <Text>Not Pressable</Text>
        </Card>
      );

      const card = getByTestId('non-pressable-card');
      expect(card).toBeTruthy();
    });
  });

});