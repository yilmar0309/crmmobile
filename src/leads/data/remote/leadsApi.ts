import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EReducersPath} from '@/core/enums';
import {apiLeadsBase} from '@/leads/constants/api';
import {LeadsEntity} from './entities/leadsEntity';

export const leadsApi = createApi({
  reducerPath: EReducersPath.LEADS_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: ['Leads', 'Prospects'],
  baseQuery: fetchBaseQuery({
    baseUrl: apiLeadsBase.baseUrl,
    timeout: 30 * 1000,
    prepareHeaders: async (headers, {}) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      );
      return headers;
    },
  }),
  endpoints: build => ({
    getAllLeads: build.query<LeadsEntity[], string>({
      query: searchText =>
        `${apiLeadsBase.endpoints.leads}?searchText=${searchText}`,
      providesTags: ['Leads'],
    }),
    validateLeads: build.mutation<void, string>({
      query: id => ({
        url: `${apiLeadsBase.endpoints.leads}/${id}/validate`,
        method: 'POST',
      }),
      invalidatesTags: ['Leads', 'Prospects'],
    }),
  }),
});

export const {useGetAllLeadsQuery, useValidateLeadsMutation} = leadsApi;
