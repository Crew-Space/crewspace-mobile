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
  birthday: string;
  email: string;
  contact: string;
  sns: string;
  etc: string;
};

export type MemberProfile = MemberBaseInfo & SpaceOptionsInfo;
export type MemberProfilePreviewType = Omit<MemberBaseInfo, 'description'> & { memberId: number };

/** Space **/
export type SpaceBaseInfo = {
  spaceName: string;
  spaceImage: string;
  bannerImage: string;
};

export type NoticeType = 'ALL' | 'SAVED' | 'NREAD';
export type CommunityType = 'ALL' | 'SAVED';

///////

export type BaseProfile = {
  image: string;
  name: string;
  description: string;
};
