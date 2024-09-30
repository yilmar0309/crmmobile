import React from 'react';
import {VirtualizedList} from 'react-native';
import {
  AppContainer,
  AppLoadingList,
  AppShowEmptyList,
} from '@/core/components';
import {AppRenderCard} from '@/core/components/AppRenderCard';
import {TabsHomeScreenProps} from '@/core/types/StackRoutes';
import {ProspectsEntity} from '@/prospects/data/remote/entities/prospectsEntity';
import {ProspectStackRoutes} from '@/prospects/routes';
import {useViewModelProvider, ViewModelProvider} from './ViewModelContext';

const ProspectsScreenContent =
  ({}: TabsHomeScreenProps<ProspectStackRoutes.PROSPECTS>) => {
    const {prospectsData, isFetching, refetch, getItem, getItemCount} =
      useViewModelProvider();

    return (
      <AppContainer>
        {isFetching ? (
          <AppLoadingList />
        ) : (
          <VirtualizedList
            data={prospectsData}
            renderItem={({item}: {item: ProspectsEntity}) => (
              <AppRenderCard item={item} />
            )}
            getItemCount={getItemCount}
            getItem={getItem}
            keyExtractor={item => item.id.toString()}
            refreshing={isFetching}
            onRefresh={refetch}
            ListEmptyComponent={<AppShowEmptyList />}
          />
        )}
      </AppContainer>
    );
  };

export const ProspectsScreen = (
  props: TabsHomeScreenProps<ProspectStackRoutes.PROSPECTS>,
) => (
  <ViewModelProvider>
    <ProspectsScreenContent {...props} />
  </ViewModelProvider>
);
