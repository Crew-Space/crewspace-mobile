export interface PostHeaderSubTextProps {
  left: string;
  right: string;
}

export interface PostHeaderProps {
  subText: PostHeaderSubTextProps;
  title: string | React.ReactNode;
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
  isPinned: boolean;
}
