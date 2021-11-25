import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ENV from 'environments';
import { RootState } from 'store';

export const spaceApi = createApi({
  reducerPath: 'spaceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
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
    getSpace: builder.query<string, string>({
      query: (spaceCode) => `space/${spaceCode}`,
    }),
    getRegisterInfo: builder.query<string, string>({
      query: () => 'space/register-info',
    }),
  }),
});

export const { useGetSpaceQuery, useGetRegisterInfoQuery } = spaceApi;
