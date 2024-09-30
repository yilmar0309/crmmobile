import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LeadsStackRoutes, useLeadsGroupScreens} from '@/leads';
import {useProspectsGroupScreens} from '@/prospects';
import {TabParamList} from '../types/StackRoutes';
import {CustomTabBar} from './CustomTabBar';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigation() {
  const renderLeadsGroupScreens = useLeadsGroupScreens();
  const renderProspectsGroupScreens = useProspectsGroupScreens();

  return (
    <Tab.Navigator
      initialRouteName={LeadsStackRoutes.LEADS}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      {renderLeadsGroupScreens()}
      {renderProspectsGroupScreens()}
    </Tab.Navigator>
  );
}
