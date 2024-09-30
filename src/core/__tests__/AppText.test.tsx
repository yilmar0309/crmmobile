import React from 'react';
import {StyleSheet} from 'react-native';
import {render} from '@testing-library/react-native';
import {AppText, AppTextVariant} from '../components/AppText';
import {colorsDark, colorsLight} from '../theme';
const mockedAppearance = require('react-native/Libraries/Utilities/Appearance');

describe('AppText', () => {
  beforeEach(() => {
    mockedAppearance.setColorScheme('dark');
  });

  afterEach(() => {
    mockedAppearance.setColorScheme('light');
  });

  const testText = 'Test Text';

  const testVariants = Object.values(AppTextVariant);

  testVariants.forEach(variant => {
    it(`renders correctly with variant ${variant} in light mode`, () => {
      mockedAppearance.setColorScheme('light');
      const {getByText, toJSON} = render(
        <AppText variant={variant}>{testText}</AppText>,
      );
      const element = getByText(testText);
      expect(element).toBeTruthy();

      // Flattening the style to handle arrays of styles
      const flattenedStyle = StyleSheet.flatten(element.props.style);

      expect(flattenedStyle.color).toBe(colorsLight.PRIMARY_TEXT_COLOR);
      expect(toJSON()).toMatchSnapshot();
    });

    it(`renders correctly with variant ${variant} in dark mode`, () => {
      const {getByText} = render(
        <AppText variant={variant}>{testText}</AppText>,
      );
      const element = getByText(testText);
      expect(element).toBeTruthy();

      // Flattening the style to handle arrays of styles
      const flattenedStyle = StyleSheet.flatten(element.props.style);

      expect(flattenedStyle.color).toBe(colorsDark.PRIMARY_TEXT_COLOR);
    });
  });

  it('applies custom color when provided', () => {
    const customColor = '#123456';
    const {getByText} = render(
      <AppText variant={AppTextVariant.body1} color={customColor}>
        {testText}
      </AppText>,
    );
    const element = getByText(testText);
    // Flattening the style to handle arrays of styles
    const flattenedStyle = StyleSheet.flatten(element.props.style);
    expect(flattenedStyle.color).toBe(customColor);
  });
});
