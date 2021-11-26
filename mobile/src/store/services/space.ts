import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { header } from 'store/services';
import ENV from 'environments';
import { ReqSpaceEnter } from 'types/Request';
import {
  ResMySpaces,
  ResRegisterInfo,
  ResSpace,
  ResSpaceEnter,
  ResSpaceHome,
} from 'types/Response';

export const spaceApi = createApi({
  reducerPath: 'spaceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: header,
  }),
  endpoints: (builder) => ({
    checkInvitation: builder.query<ResSpace, string>({
      query: (spaceCode) => `/space/${spaceCode}`,
      transformResponse: (response: { data: ResSpace }) => response.data,
    }),
    getRegisterInfo: builder.query<ResRegisterInfo, void>({
      query: () => '/space/register-info',
      transformResponse: (response: { data: ResRegisterInfo }) => response.data,
    }),
    enterSpace: builder.mutation<ResSpaceEnter, ReqSpaceEnter>({
      query: (userInfo) => {
        const formdata = new FormData();
        Object.entries(userInfo).forEach(([key, value]) => formdata.append(key, value));

        return {
          url: '/space/enter',
          method: 'POST',
          body: formdata,
        };
      },
      transformResponse: (response: { data: ResSpaceEnter }) => response.data,
    }),
    getSpaceHome: builder.query<ResSpaceHome, void>({
      query: () => '/space',
      transformResponse: (response: { data: ResSpaceHome }) => response.data,
    }),
    getMySpaces: builder.query<ResMySpaces, void>({
      query: () => '/spaces',
      transformResponse: (response: { data: ResMySpaces }) => response.data,
    }),
  }),
});

export const {
  useCheckInvitationQuery,
  useGetRegisterInfoQuery,
  useGetMySpacesQuery,
  useEnterSpaceMutation,
  useGetSpaceHomeQuery,
} = spaceApi;
