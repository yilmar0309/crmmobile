import {mapLeadsData} from '@/leads/data/mappers/mappers';
import {LeadsModel} from '@/leads/data/models/leadsModel';
import { LeadsEntity } from '@/leads/data/remote/entities/leadsEntity';
import {
  useGetAllLeadsQuery,
  useValidateLeadsMutation,
} from '@/leads/data/remote/leadsApi';

export function useRepository(): {
  leadsData: LeadsModel[];
  isFetching: boolean;
  handleValidateLeadApi: (id: string) => {
    unwrap(): Promise<LeadsEntity>;
  };
  refetch: () => void;
} {
  const {data, isFetching, refetch} = useGetAllLeadsQuery('');
  const [handleValidateLeadApi] = useValidateLeadsMutation();

  const leadsData = data ? data.map(mapLeadsData) : [];

  return {
    leadsData,
    isFetching,
    refetch,
    handleValidateLeadApi,
  };
}
