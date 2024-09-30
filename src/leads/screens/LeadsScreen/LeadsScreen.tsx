import React from 'react';
import {VirtualizedList} from 'react-native';
import {AppContainer, AppLoadingList} from '@/core/components';
import {AppRenderCard} from '@/core/components/AppRenderCard';
import {TabsHomeScreenProps} from '@/core/types/StackRoutes';
import {LeadsEntity} from '@/leads/data/remote/entities/leadsEntity';
import {LeadsStackRoutes} from '@/leads/routes';
import {useViewModelProvider, ViewModelProvider} from './ViewModelContext';

const LeadsScreenContent =
  ({}: TabsHomeScreenProps<LeadsStackRoutes.LEADS>) => {
    const {
      leadsData,
      isFetching,
      refetch,
      getItem,
      getItemCount,
      handleValidateLead,
    } = useViewModelProvider();

    return (
      <AppContainer>
        {isFetching ? (
          <AppLoadingList />
        ) : (
          <VirtualizedList
            testID="virtualized-list"
            data={leadsData}
            renderItem={({item}: {item: LeadsEntity}) => (
              <AppRenderCard item={item} onValidate={handleValidateLead} />
            )}
            getItemCount={getItemCount}
            getItem={getItem}
            keyExtractor={item => item.id.toString()}
            refreshing={isFetching}
            onRefresh={refetch}
          />
        )}
      </AppContainer>
    );
  };

export const LeadsScreen = (
  props: TabsHomeScreenProps<LeadsStackRoutes.LEADS>,
) => (
  <ViewModelProvider>
    <LeadsScreenContent {...props} />
  </ViewModelProvider>
);
