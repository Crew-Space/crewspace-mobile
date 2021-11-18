import React from 'react';

export interface PostHeaderSubTextProps {
  left: string;
  right: string;
}

export interface PostHeaderProps {
  subText: PostHeaderSubTextProps;
  Title: string | React.FunctionComponent;
  isSaved?: boolean;
}

export interface PostPreviewProps {
  header: Omit<PostHeaderProps, 'isSaved'>;
  description: string;
  isSaved?: boolean;
  viewed?: boolean;
}

export interface PinnedNoticeProps {
  header: Omit<PostHeaderProps, 'isSaved'>;
}
