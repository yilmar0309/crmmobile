import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ArrowBackIcon} from '@/core/assets/svg';
import {AppHeaderLeftBack} from '../components/AppHeaderLeftBack';

describe('AppHeaderLeftBack', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const {getByTestId, toJSON} = render(
      <AppHeaderLeftBack onPress={mockOnPress} />,
    );
    const button = getByTestId('header-back-button');
    expect(button).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when pressed', () => {
    const {getByTestId} = render(<AppHeaderLeftBack onPress={mockOnPress} />);
    const button = getByTestId('header-back-button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders custom icon when provided', () => {
    const customIcon = (
      <ArrowBackIcon width={30} height={30} color="red" testID="custom-icon" />
    );
    const {getByTestId} = render(
      <AppHeaderLeftBack customIcon={customIcon} onPress={mockOnPress} />,
    );
    const icon = getByTestId('custom-icon');
    expect(icon).toBeTruthy();
    expect(icon.props.width).toEqual(30);
    expect(icon.props.height).toEqual(30);
  });
});
