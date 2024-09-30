import React, {useState} from 'react';
import {DimensionValue, StyleSheet, useColorScheme} from 'react-native';
import {MotiView} from 'moti';
import {Skeleton} from 'moti/skeleton';
import FastImage, {ResizeMode} from 'react-native-fast-image';
import {View} from 'react-native-ui-lib';
import {colorsDark, colorsLight} from '@/core/theme';

interface AppImageProps {
  uri: string;
  borderRadius?: number;
  sWidth?: DimensionValue | undefined;
  sHeight?: DimensionValue | undefined;
  resizeMode?: ResizeMode | undefined;
  aspectRatio?: string | number | undefined;
}

export const AppImage = ({
  uri,
  borderRadius = 0,
  sWidth = 100,
  sHeight = 100,
  resizeMode = 'contain',
  aspectRatio = 1,
}: AppImageProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: isLoading ? 0 : sHeight,
          width: isLoading ? 0 : sWidth,
          borderRadius: borderRadius || 100,
        }}>
        <FastImage
          source={{uri: uri}}
          resizeMode={resizeMode}
          style={[
            styles.image,
            {borderRadius: borderRadius || 100, aspectRatio: aspectRatio || 1},
          ]}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </View>
      {isLoading && (
        <MotiView style={styles.containerSkeleton}>
          <Skeleton
            width={sWidth}
            height={sHeight}
            radius={borderRadius ? 'round' : 'square'}
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerSkeleton: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
});
