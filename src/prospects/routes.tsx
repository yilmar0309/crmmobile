import React, {useMemo} from 'react';
import {Tab} from '@/core/navigation';
import {ProspectsScreen} from './screens';

export enum ProspectStackRoutes {
  PROSPECTS = 'PROSPECTS',
}

export const useProspectsGroupScreens = () => {
  return useMemo(() => {
    const ProspectsGroupScreens = () => (
      <Tab.Group>
        <Tab.Screen
          name={ProspectStackRoutes.PROSPECTS}
          component={ProspectsScreen}
          options={() => ({
            headerShown: false,
            title: '',
            headerShadowVisible: false,
          })}
        />
      </Tab.Group>
    );

    ProspectsGroupScreens.displayName = 'ProspectsGroupScreens';
    return ProspectsGroupScreens;
  }, []);
};
