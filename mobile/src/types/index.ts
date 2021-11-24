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
