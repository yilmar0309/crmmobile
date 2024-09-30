import React, {createContext, ReactNode, useCallback, useContext} from 'react';
import Toast from 'react-native-toast-message';
import {LeadsEntity} from '@/leads/data/remote/entities/leadsEntity';
import {useRepository} from './useRepository';

type ViewModelContextType = {
  leadsData: LeadsEntity[];
  isFetching: boolean;
  getItem: (dataItem: LeadsEntity[], index: number) => LeadsEntity;
  getItemCount: () => number;
  handleValidateLead: (id: number) => Promise<void>;
  refetch: () => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({children}: {children: ReactNode}) {
  const {leadsData, isFetching, refetch, handleValidateLeadApi} =
    useRepository();

  const handleValidateLead = useCallback(
    async (id: number) => {
      try {
        await handleValidateLeadApi(id.toString());
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Validation success',
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Validation Failed',
          text2: 'There was an error validating this lead.',
        });
      }
    },
    [handleValidateLeadApi],
  );

  const getItem = (dataItem: LeadsEntity[], index: number): LeadsEntity =>
    dataItem[index];

  const getItemCount = () => leadsData.length;

  return (
    <ViewModelContext.Provider
      value={{
        leadsData,
        isFetching,
        refetch,
        getItem,
        getItemCount,
        handleValidateLead,
      }}>
      {children}
    </ViewModelContext.Provider>
  );
}

export function useViewModelProvider() {
  const context = useContext(ViewModelContext);
  if (context === undefined) {
    throw new Error('Publication View Model Provider');
  }
  return context;
}
