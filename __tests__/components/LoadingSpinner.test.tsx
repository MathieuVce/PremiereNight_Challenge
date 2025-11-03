import React from 'react';
import {render} from '@testing-library/react-native';
import LoadingSpinner from '@/components/common/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders correctly', () => {
    const {toJSON} = render(<LoadingSpinner />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays custom message', () => {
    const {getByText} = render(<LoadingSpinner message="Loading movies..." />);
    expect(getByText('Loading movies...')).toBeTruthy();
  });

  it('renders in fullScreen mode', () => {
    const {getByTestId} = render(<LoadingSpinner fullScreen testID="spinner" />);
    expect(getByTestId('spinner')).toBeTruthy();
  });
});