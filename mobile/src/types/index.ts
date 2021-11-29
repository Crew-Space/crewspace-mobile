import React from 'react';

export type PostingType = 'notice' | 'community';

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

/** Space **/
export type SpaceBaseInfo = {
  spaceName: string;
  spaceImage: string;
  bannerImage: string;
};

export type NoticeType = 'ALL' | 'SAVED' | 'NREAD';
export type CommunityType = 'ALL' | 'SAVED';
export type PostType = 'notice' | 'community';

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
