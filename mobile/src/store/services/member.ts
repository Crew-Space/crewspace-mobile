import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ENV from 'environments';
import { header } from 'store/services';
import { ResMember, ResMemberCategories, ResMembers } from 'types/Response';

export const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: header,
  }),
  endpoints: (builder) => ({
    getMemberCategories: builder.query<ResMemberCategories, void>({
      query: () => '/members/categories',
      transformResponse: (response: { data: ResMemberCategories }) => response.data,
    }),
    getMembers: builder.query<ResMembers, { memberCategoryId?: number }>({
      query: (params) => ({ url: '/members', params }),
      transformResponse: (response: { data: ResMembers }) => response.data,
    }),
    getMember: builder.query<ResMember, number>({
      query: (memberId) => `/members/${memberId}`,
      transformResponse: (response: { data: ResMember }) => response.data,
    }),
  }),
});

export const { useGetMemberCategoriesQuery, useGetMembersQuery, useGetMemberQuery } = memberApi;
