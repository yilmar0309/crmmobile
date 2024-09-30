import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EReducersPath} from '@/core/enums';
import {apiProspectsBase} from '@/prospects/constants/api';
import {ProspectsEntity} from './entities/prospectsEntity';

export const prospectsApi = createApi({
  reducerPath: EReducersPath.PROSPECTS_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: ['Prospects'],
  baseQuery: fetchBaseQuery({
    baseUrl: apiProspectsBase.baseUrl,
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
    getAllProspects: build.query<ProspectsEntity[], string>({
      query: searchText =>
        `${apiProspectsBase.endpoints.prospects}?searchText=${searchText}`,
      providesTags: ['Prospects'],
    }),
  }),
});

export const {useGetAllProspectsQuery} = prospectsApi;
