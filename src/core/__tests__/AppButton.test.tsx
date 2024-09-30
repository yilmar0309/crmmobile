import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';
import {
  AppButton,
  AppButtonSizeVariant,
  AppButtonVariant,
} from '../components/AppButton';
import {colorsLight} from '../theme';

const MockIcon = () => <Text>Icon</Text>;

describe('AppButton', () => {
  it('renders correctly with minimal props', () => {
    const {getByText, toJSON} = render(
      <AppButton
        variant={AppButtonVariant.contained}
        size={AppButtonSizeVariant.medium}
        label="Click me"
      />,
    );

    expect(getByText('Click me')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles onPress events', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <AppButton
        variant={AppButtonVariant.contained}
        size={AppButtonSizeVariant.medium}
        label="Click me"
        onPress={onPressMock}
      />,
    );

    fireEvent.press(getByText('Click me'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('shows loading indicator when isLoading is true', () => {
    const {getByTestId} = render(
      <AppButton
        variant={AppButtonVariant.contained}
        size={AppButtonSizeVariant.medium}
        isLoading={true}
      />,
    );
    expect(getByTestId('app-button')).toBeTruthy();
  });

  it('shows disabled state correctly', () => {
    const {getByText} = render(
      <AppButton
        variant={AppButtonVariant.contained}
        size={AppButtonSizeVariant.medium}
        label="Disabled"
        disabled={true}
      />,
    );

    const textComponent = getByText('Disabled');
    const style = StyleSheet.flatten(textComponent.props.style);

    expect(style.color).toBe(colorsLight.BUTTON_DISABLED_TEXT_COLOR);
  });

  it('renders icon when provided', () => {
    const {getByText} = render(
      <AppButton
        variant={AppButtonVariant.contained}
        size={AppButtonSizeVariant.medium}
        iconLeft={<MockIcon />}
        label="With Icon"
      />,
    );

    expect(getByText('Icon')).toBeTruthy();
  });

  it('applies styles based on variant and size', () => {
    const {getByText} = render(
      <AppButton
        variant={AppButtonVariant.outlined}
        size={AppButtonSizeVariant.large}
        label="Test"
      />,
    );

    const textComponent = getByText('Test');
    const style = StyleSheet.flatten(textComponent.props.style);
    expect(style.fontSize).toBe(16);
  });
});
