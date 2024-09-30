/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import {StyleSheet, Text, TextProps, useColorScheme} from 'react-native';
import {colorsDark, colorsLight} from '@/core/theme';

export enum AppTextVariant {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  subtitle1 = 'subtitle1',
  subtitle2 = 'subtitle2',
  body1 = 'body1',
  body2 = 'body2',
  button = 'button',
  caption = 'caption',
  overline = 'overline',
}

interface AppTextProps extends TextProps {
  variant: AppTextVariant;
  children: React.ReactNode;
  color?: string;
}

export const AppText = ({
  variant,
  children,
  style,
  color,
  ...props
}: AppTextProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode
    ? colorsDark.PRIMARY_TEXT_COLOR
    : colorsLight.PRIMARY_TEXT_COLOR;
  return (
    <Text
      style={[styles[variant], {color: color || textColor}, style]}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontWeight: 'bold',
    fontSize: 96,
    letterSpacing: -1.5,
  },
  h2: {
    fontWeight: '600',
    fontSize: 60,
    letterSpacing: -0.5,
  },
  h3: {
    fontWeight: '400',
    fontSize: 48,
  },
  h4: {
    fontWeight: '400',
    fontSize: 34,
    letterSpacing: 0.25,
  },
  h5: {
    fontWeight: '400',
    fontSize: 24,
  },
  h6: {
    fontWeight: '600',
    fontSize: 20,
    letterSpacing: 0.15,
  },
  subtitle1: {
    fontWeight: '400',
    fontSize: 16,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.1,
  },
  body1: {
    fontWeight: '400',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  body2: {
    fontWeight: '400',
    fontSize: 14,
    letterSpacing: 0.25,
  },
  button: {
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 1.25,
  },
  caption: {
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 0.4,
  },
  overline: {
    fontWeight: '400',
    fontSize: 10,
    letterSpacing: 1.5,
  },
});
