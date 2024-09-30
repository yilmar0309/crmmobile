import React, {useMemo} from 'react';
import {Tab} from '@/core/navigation';
import {LeadsScreen} from './screens';

export enum LeadsStackRoutes {
  LEADS = 'LEADS',
}

export const useLeadsGroupScreens = () => {
  return useMemo(() => {
    const LeadsGroupScreens = () => (
      <Tab.Group>
        <Tab.Screen
          name={LeadsStackRoutes.LEADS}
          component={LeadsScreen}
          options={() => ({
            headerShown: false,
            title: '',
            headerShadowVisible: false,
          })}
        />
      </Tab.Group>
    );

    LeadsGroupScreens.displayName = 'LeadsGroupScreens';
    return LeadsGroupScreens;
  }, []);
};
