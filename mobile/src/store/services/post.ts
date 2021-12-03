import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MY_NOTICE_ID, POST_ALL_ID } from 'constant';
import ENV from 'environments';
import { header } from 'store/services';
import { ReqPosts } from 'types/Request';
import {
  CommunityPost,
  NoticePost,
  ReqNewPost,
  ResCommunityPosts,
  ResNoticePosts,
  ResPostCategory,
} from 'types/Response';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: header,
  }),
  tagTypes: ['CommunityPost', 'NoticePost', 'save', 'fix', 'Reset'],
  endpoints: (builder) => ({
    getPostCategories: builder.query<ResPostCategory, void>({
      query: () => '/posts/categories',
      transformResponse: (response: { data: ResPostCategory }) => ({
        noticeCategories: [
          { categoryId: POST_ALL_ID, categoryName: '공지 전체' },
          { categoryId: MY_NOTICE_ID, categoryName: '내 공지' },
          ...response.data.noticeCategories,
        ],
        communityCategories: [
          { categoryId: POST_ALL_ID, categoryName: '커뮤니티 전체' },
          ...response.data.communityCategories,
        ],
        tagTypes: ['Reset'],
      }),
    }),

    getNoticePosts: builder.query<ResNoticePosts, ReqPosts>({
      query: (params) => ({ url: '/posts/notice', params }),
      transformResponse: (response: { data: ResNoticePosts }) => response.data,
      providesTags: ['NoticePost', 'Reset'],
    }),
    getNoticePost: builder.query<NoticePost, number>({
      query: (postId) => `/posts/notice/${postId}`,
      transformResponse: (response: { data: NoticePost }) => response.data,
      providesTags: ['save', 'fix', 'Reset'],
    }),
    getCommunityPosts: builder.query<ResCommunityPosts, ReqPosts>({
      query: (params) => ({ url: '/posts/community', params }),
      transformResponse: (response: { data: ResCommunityPosts }) => response.data,
      providesTags: ['CommunityPost', 'Reset'],
    }),
    getCommunityPost: builder.query<CommunityPost, number>({
      query: (postId) => `/posts/community/${postId}`,
      transformResponse: (response: { data: CommunityPost }) => response.data,
      providesTags: ['save', 'Reset'],
    }),

    savePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/posts/${postId}/save`,
        method: 'POST',
      }),
      transformResponse: (response: { data: void }) => response.data,
      invalidatesTags: ['save'],
    }),
    unsavePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/posts/${postId}/save`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: void }) => response.data,
      invalidatesTags: ['save'],
    }),
    fixNotice: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/posts/${postId}/fix`,
        method: 'POST',
      }),
      transformResponse: (response: { data: void }) => response.data,
      invalidatesTags: ['fix'],
    }),
    unfixNotice: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/posts/${postId}/fix`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: void }) => response.data,
      invalidatesTags: ['fix'],
    }),

    postCommunity: builder.mutation<void, ReqNewPost>({
      query: (newPost) => {
        const formdata = new FormData();
        newPost.image?.forEach((img) => formdata.append('image', img));
        Object.entries(newPost)
          .filter(([key, _]) => key !== 'image')
          .forEach(([key, value]) => formdata.append(key, value));

        return {
          url: `/posts/community/${newPost.postCategoryId}/post`,
          method: 'POST',
          body: formdata,
        };
      },
      transformResponse: (response: { data: void }) => response.data,
      invalidatesTags: ['CommunityPost'],
    }),
  }),
});

export const {
  useGetPostCategoriesQuery,
  useLazyGetPostCategoriesQuery,
  useGetNoticePostsQuery,
  useGetNoticePostQuery,
  useGetCommunityPostsQuery,
  useGetCommunityPostQuery,
  useSavePostMutation,
  useUnsavePostMutation,
  useFixNoticeMutation,
  useUnfixNoticeMutation,
  usePostCommunityMutation,
} = postApi;
