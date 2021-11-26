import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ENV from 'environments';
import { header } from 'store/services';
import { ResMemberCategories } from 'types/Response';

export const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: header,
  }),
  endpoints: (builder) => ({
    getPostCategories: builder.query<ResMemberCategories, void>({
      query: () => '/members/categories',
      transformResponse: (response: { data: ResMemberCategories }) => response.data,
    }),
  }),
});

export const { useGetPostCategoriesQuery } = memberApi;
