import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {render} from '@testing-library/react-native';
import {AppContainer} from '../components/AppContainer';
import {colorsDark, colorsLight} from '../theme';
const mockedAppearance = require('react-native/Libraries/Utilities/Appearance');

describe('AppContainer', () => {
  beforeEach(() => {
    mockedAppearance.setColorScheme('dark');
  });

  afterEach(() => {
    mockedAppearance.setColorScheme('light');
  });

  it('renders correctly in dark mode', () => {
    const {getByText, toJSON} = render(
      <AppContainer>
        <Text>Test Content</Text>
      </AppContainer>,
    );

    expect(getByText('Test Content')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies dark mode background color', () => {
    const {getByTestId} = render(
      <AppContainer>
        <Text>Child Content</Text>
      </AppContainer>,
    );

    const parent = getByTestId('app-container');
    const flattenedStyles = StyleSheet.flatten(parent.props.style);
    expect(flattenedStyles.backgroundColor).toBe(
      colorsDark.BACKGROUND_SCREEN_COLOR,
    );
  });
  it('applies light mode background color', () => {
    mockedAppearance.setColorScheme('light');

    const {getByTestId} = render(
      <AppContainer>
        <Text>Child Content</Text>
      </AppContainer>,
    );

    const parent = getByTestId('app-container');
    const flattenedStyles = StyleSheet.flatten(parent.props.style);
    expect(flattenedStyles.backgroundColor).toBe(
      colorsLight.BACKGROUND_SCREEN_COLOR,
    );
  });

  it('does not include keyboard avoiding behavior on Android', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
      select: jest.fn(),
    }));

    const {getByText} = render(
      <AppContainer avoidKeyboard={true}>
        <Text>Test Content</Text>
      </AppContainer>,
    );
    const parent = getByText('Test Content').parent;
    expect(parent?.props.behavior).toBeUndefined();
  });
});
