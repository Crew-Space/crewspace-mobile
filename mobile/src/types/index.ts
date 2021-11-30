import React from 'react';

export type FilterType = 'ALL' | 'SAVED' | 'NREAD';
export type NoticeType = FilterType;
export type CommunityType = Omit<FilterType, 'NREAD'>;
export type PostType = 'notice' | 'community';

export interface PostHeaderSubTextProps {
  left: string;
  right: string;
}

export interface PostHeaderProps {
  subText: PostHeaderSubTextProps;
  Title: string | React.FunctionComponent;
  isSaved?: boolean;
}

export interface PinnedNoticeHeaderProps {
  subText: PostHeaderSubTextProps;
  Title: string;
  postId: number;
}

export interface PostPreviewProps {
  postId: number;
  header: Omit<PostHeaderProps, 'isSaved'>;
  description: string;
  isSaved?: boolean;
  viewed?: boolean;
}

export interface PinnedNoticeProps {
  header: PinnedNoticeHeaderProps;
}

export type HeaderListItemType = {
  name: string;
  imageUrl?: string;
  id: number;
};

/** Member **/
export type MemberBaseInfo = {
  name: string;
  profileImage: string;
  memberCategory: string;
  memberCategoryId: number;
  description: string;
};

export type SpaceOptionsInfo = {
  birthdate: string;
  email: string;
  contact: string;
  sns: string;
  etc: string;
};

export type MemberProfile = MemberBaseInfo & SpaceOptionsInfo;

/** Space **/
export type SpaceBaseInfo = {
  spaceName: string;
  spaceImage: string;
  bannerImage: string;
};

export type BaseProfile = {
  image: string;
  name: string;
  description: string;
};

export type File = {
  uri: string;
  type: string;
  name: string;
};

export type Category = {
  categoryName: string;
  categoryId: number;
};
export type Target = {
  targetId: number;
  targetName: string;
};
export type Space = {
  spaceId: number;
  spaceName: string;
  spaceImage: string;
};
export type FixedNotice = {
  categoryName: string;
  title: string;
  writtenDate: string;
  postId: number;
};
export type Author = {
  authorId: number;
  authorName: string;
  authorImage: string;
  authorCategoryName: string;
};
export type PostBaseInfo = {
  postId: number;
  categoryName: string;
  description: string;
  writtenDate: string;
  isSaved: boolean;
};

export type NewCategoryType = {
  name: string;
  isDeletable: boolean;
  isEditable: boolean;
};
