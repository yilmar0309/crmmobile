import React from 'react';
import {enableScreens} from 'react-native-screens';
import {RootStackRoutes} from '../types/StackRoutes';
import {Stack} from '.';
import {TabNavigation} from './TabNavigation';

enableScreens();

export function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName={RootStackRoutes.TABS_HOME}>
      <Stack.Screen
        name={RootStackRoutes.TABS_HOME}
        component={TabNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
