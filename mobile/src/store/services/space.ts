import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ENV from 'environments';
import { RootState } from 'store';
import { ReqSpaceEnter } from 'types/Request';
import { ResMySpaces, ResRegisterInfo, ResSpace, ResSpaceEnter } from 'types/Response';

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
    checkInvitation: builder.query<ResSpace, string>({
      query: (spaceCode) => `space/${spaceCode}`,
      transformResponse: (response: { data: ResSpace }) => response.data,
    }),
    getRegisterInfo: builder.query<ResRegisterInfo, void>({
      query: () => 'space/register-info',
      transformResponse: (response: { data: ResRegisterInfo }) => response.data,
    }),
    enterSpace: builder.mutation<ResSpaceEnter, ReqSpaceEnter>({
      query: (userInfo) => ({ url: 'space/enter', method: 'POST', body: userInfo }),
      transformResponse: (response: { data: ResSpaceEnter }) => response.data,
    }),
    getMySpaces: builder.query<ResMySpaces, void>({
      query: () => 'spaces',
      transformResponse: (response: { data: ResMySpaces }) => response.data,
    }),
  }),
});

export const {
  useCheckInvitationQuery,
  useGetRegisterInfoQuery,
  useGetMySpacesQuery,
  useEnterSpaceMutation,
} = spaceApi;
