import React, {createContext, ReactNode, useContext} from 'react';
import {ProspectsEntity} from '@/prospects/data/remote/entities/prospectsEntity';
import {useRepository} from './useRepository';

type ViewModelContextType = {
  isFetching: boolean;
  prospectsData: ProspectsEntity[];
  getItem: (dataItem: ProspectsEntity[], index: number) => ProspectsEntity;
  getItemCount: () => number;
  refetch: () => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({children}: {children: ReactNode}) {
  const {prospectsData, isFetching, refetch} = useRepository();

  const getItem = (
    dataItem: ProspectsEntity[],
    index: number,
  ): ProspectsEntity => dataItem[index];

  const getItemCount = () => prospectsData.length;

  return (
    <ViewModelContext.Provider
      value={{
        isFetching,
        prospectsData,
        getItem,
        getItemCount,
        refetch,
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
