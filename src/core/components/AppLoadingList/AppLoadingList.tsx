import React from 'react';
import {Platform, StyleSheet, useColorScheme} from 'react-native';
import {MotiView} from 'moti';
import {Skeleton} from 'moti/skeleton';
import {AppContainer, AppSpacer} from '@/core/components';
import {colorsDark, colorsLight} from '@/core/theme';

export const AppLoadingList = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <AppContainer avoidKeyboard>
      <MotiView style={styles.containerSkeleton}>
        <Skeleton
          width="90%"
          height={200}
          colors={
            isDarkMode
              ? [
                  colorsDark.BACKGROUND_SCREEN_COLOR,
                  colorsLight.BACKGROUND_SCREEN_COLOR,
                ]
              : [colorsLight.GRAY_01, colorsDark.GRAY_03]
          }
        />
        <AppSpacer height={20} />
        <Skeleton
          width="90%"
          height={200}
          colors={
            isDarkMode
              ? [
                  colorsDark.BACKGROUND_SCREEN_COLOR,
                  colorsLight.BACKGROUND_SCREEN_COLOR,
                ]
              : [colorsLight.GRAY_01, colorsDark.GRAY_03]
          }
        />
      </MotiView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  containerSkeleton: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 60 : 32,
    alignItems: 'center',
  },
});
