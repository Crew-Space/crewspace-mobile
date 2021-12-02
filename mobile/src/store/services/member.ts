import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ENV from 'environments';
import { Platform } from 'react-native';
import { header } from 'store/services';
import { ReqUpdateMyProfile } from 'types/Request';
import { ResMember, ResMemberCategories, ResMembers } from 'types/Response';

export const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: header,
  }),
  tagTypes: ['Reset'],
  endpoints: (builder) => ({
    getMemberCategories: builder.query<ResMemberCategories, void>({
      query: () => '/members/categories',
      transformResponse: (response: { data: ResMemberCategories }) => response.data,
      providesTags: ['Reset'],
    }),
    getMembers: builder.query<ResMembers, { memberCategoryId?: number }>({
      query: (params) => ({ url: '/members', params }),
      transformResponse: (response: { data: ResMembers }) => response.data,
      providesTags: ['Reset'],
    }),
    getMember: builder.query<ResMember, number>({
      query: (memberId) => `/members/${memberId}`,
      transformResponse: (response: { data: ResMember }) => response.data,
      providesTags: ['Reset'],
    }),

    updateMyProfile: builder.mutation<void, ReqUpdateMyProfile>({
      query: (newProfile) => {
        const formdata = new FormData();
        newProfile.profileImage &&
          formdata.append('image', {
            ...newProfile.profileImage,
            uri:
              Platform.OS === 'ios'
                ? newProfile.profileImage.uri!.replace('file://', '')
                : newProfile.profileImage.uri,
          });
        Object.entries(newProfile)
          .filter(([key, _]) => key !== 'profileImage')
          .forEach(([key, value]) => formdata.append(key, value));

        return {
          url: '/members/me',
          method: 'PUT',
          body: formdata,
        };
      },
      transformResponse: (response: { data: void }) => response.data,
    }),
  }),
});

export const {
  useGetMemberCategoriesQuery,
  useGetMembersQuery,
  useGetMemberQuery,
  useUpdateMyProfileMutation,
} = memberApi;
