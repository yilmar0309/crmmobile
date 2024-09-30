import {mapProspectsData} from '@/prospects/data/mappers/mappers';
import {ProspectsModel} from '@/prospects/data/models/prospectsModel';
import {useGetAllProspectsQuery} from '@/prospects/data/remote/prospectsApi';

export function useRepository(): {
  prospectsData: ProspectsModel[];
  isFetching: boolean;
  refetch: () => void;
} {
  const {data, isFetching, refetch} = useGetAllProspectsQuery('');

  const prospectsData = data ? data.map(mapProspectsData) : [];

  return {
    prospectsData,
    isFetching,
    refetch,
  };
}
