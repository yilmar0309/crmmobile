import React, {useRef} from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {AppLoading} from './core/components';
import {navigationRef, StackNavigation} from './core/navigation';
import {colorsDark, colorsLight} from './core/theme';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const routerNameRef = useRef<string | undefined>();

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={
          isDarkMode
            ? colorsDark.BACKGROUND_SCREEN_COLOR
            : colorsLight.BACKGROUND_SCREEN_COLOR
        }
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        showHideTransition="fade"
      />
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routerNameRef.current = navigationRef?.getCurrentRoute()?.name;
          }}>
          <StackNavigation />
        </NavigationContainer>
      </GestureHandlerRootView>
      <Toast />
      <AppLoading />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});
