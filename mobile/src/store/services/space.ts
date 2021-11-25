import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ENV from 'environments';
import { RootState } from 'store';
import { ResMySpaces, ResSpace } from 'types/Response';

export const spaceApi = createApi({
  reducerPath: 'spaceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = ENV.token;
      const spaceId = (getState() as RootState).user.spaceId;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      if (spaceId !== -1) {
        headers.set('Space-Id', `${spaceId}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    enterSpace: builder.query<ResSpace, string>({
      query: (spaceCode) => `space/${spaceCode}`,
      transformResponse: (response: { data: ResSpace }) => response.data,
    }),
    getRegisterInfo: builder.query<string, string>({
      query: () => 'space/register-info',
    }),
    getMySpaces: builder.query<ResMySpaces, void>({
      query: () => 'spaces',
      transformResponse: (response: { data: ResMySpaces }) => response.data,
    }),
  }),
});

export const { useEnterSpaceQuery, useGetRegisterInfoQuery, useGetMySpacesQuery } = spaceApi;
