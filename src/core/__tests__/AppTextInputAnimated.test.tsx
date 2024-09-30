import React from 'react';
import {Animated, Pressable} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';
import {AppTextInputAnimated} from '../components/AppTextInputAnimated';
import {TextInputType} from '../components/AppTextInputAnimated/AppTextInputAnimated';
const mockedAppearance = require('react-native/Libraries/Utilities/Appearance');

describe('AppTextInputAnimated', () => {
  const baseProps = {
    name: 'test-input',
    label: 'Test Input',
    placeholder: 'Type here',
    control: {},
  };

  beforeEach(() => {
    mockedAppearance.setColorScheme('dark');
  });

  afterEach(() => {
    mockedAppearance.setColorScheme('light');
  });

  it('should render input with placeholder', () => {
    const {getByPlaceholderText, toJSON} = render(
      <AppTextInputAnimated {...baseProps} testID="app-text-input-1" />,
    );
    expect(getByPlaceholderText('Type here')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should display label and handle focus and blur events', () => {
    mockedAppearance.setColorScheme('dark');
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();
    const {getByTestId} = render(
      <AppTextInputAnimated
        testID="app-text-input-2"
        {...baseProps}
        setOnFocus={onFocusMock}
        setOnBlur={onBlurMock}
      />,
    );

    const inputField = getByTestId('app-text-input');
    fireEvent(inputField, 'focus');
    expect(onFocusMock).toHaveBeenCalledTimes(1);
    fireEvent(inputField, 'blur');
    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  it('should display label and handle focus and blur events if isDark is light', () => {
    mockedAppearance.setColorScheme('light');
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();
    const {getByTestId} = render(
      <AppTextInputAnimated
        testID="app-text-input-2"
        {...baseProps}
        setOnFocus={onFocusMock}
        setOnBlur={onBlurMock}
      />,
    );

    const inputField = getByTestId('app-text-input');
    fireEvent(inputField, 'focus');
    expect(onFocusMock).toHaveBeenCalledTimes(1);
    fireEvent(inputField, 'blur');
    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  it('should display error message when error is true', () => {
    mockedAppearance.setColorScheme('light');
    const errorMessage = 'Error occurred';
    const {getByText} = render(
      <AppTextInputAnimated
        testID="app-text-input-3"
        {...baseProps}
        error={true}
        textError={errorMessage}
      />,
    );
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('should handle text change correctly', () => {
    const onChangeMock = jest.fn();
    const {getByTestId} = render(
      <AppTextInputAnimated
        {...baseProps}
        onChange={onChangeMock}
        testID="app-text-input-4"
      />,
    );
    const inputField = getByTestId('app-text-input');
    fireEvent(inputField, 'onChangeText', 'New text');

    expect(onChangeMock).toHaveBeenCalledWith('New text');
  });

  it('should display and interact with right icon when provided', () => {
    const onIconPress = jest.fn();
    const RightIcon = () => (
      <Pressable testID="right-icon" onPress={onIconPress} />
    );
    const {getByTestId} = render(
      <AppTextInputAnimated
        {...baseProps}
        rightIcon={<RightIcon />}
        testID="app-text-input-5"
        type={TextInputType.FLOAT}
      />,
    );

    fireEvent.press(getByTestId('right-icon'));
    expect(onIconPress).toHaveBeenCalled();
  });

  it('should animate to initial state and set label background to transparent on blur when input is empty', () => {
    const animateSpy = jest.spyOn(Animated, 'spring');
    const {getByTestId} = render(
      <AppTextInputAnimated {...baseProps} testID="app-text-input-6" />,
    );

    const inputField = getByTestId('app-text-input-6');
    fireEvent.changeText(inputField, '');
    fireEvent(inputField, 'blur');

    expect(animateSpy).toHaveBeenCalledWith(expect.anything(), {
      toValue: 1,
      bounciness: 0,
      useNativeDriver: true,
    });
  });
});
