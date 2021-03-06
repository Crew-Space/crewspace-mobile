import {
  Author,
  BaseProfile,
  Category,
  CommunityType,
  File,
  FixedNotice,
  NoticeType,
  PostBaseInfo,
  Space,
  SpaceOptionsInfo,
  Target,
} from 'types';
import { PickRenameMulti } from 'utils/types';

export type ReqNewPost = {
  postCategoryId: number;
  image?: File[];
  description: string;
};

export type ReqNewNoticePost = ReqNewPost & {
  title: string;
  targets: number[];
  isReserved: boolean;
  reservedTime: string;
};

export type NoticePostPreview = PostBaseInfo & {
  image: string;
  isRead: boolean;
  title: string;
};

export type CommunityPostPreview = PostBaseInfo &
  Author & {
    image: string;
  };

export type MemberProfilePreviewType = {
  memberId: number;
  name: string;
  profileImage: string;
  memberCategory: string;
};

export type NoticePost = Omit<PostBaseInfo, 'postId'> & {
  isAuthor: true;
  images: string[];
  title: string;
  isFixed: true;
  targets: Target[];
};

export type CommunityPost = Omit<PostBaseInfo, 'postId'> & {
  isAuthor: true;
  images: string[];
} & Author;

/** Space */
export type ResSpace = Space & {
  spaceDescription: string;
};

export type ResRegisterInfo = {
  hasBirthdate: boolean;
  hasEmail: boolean;
  hasContact: boolean;
  hasSns: boolean;
  hasEtc: boolean;
  memberCategories: Category[];
};

export type ResSpaceHome = {
  isAdmin: boolean;
  spaceName: string;
  spaceImage: string;
  bannerImage: string;
  fixedNotices: FixedNotice[];
  newNotices: NoticePostPreview[];
};

/** Spaces */
export type ResMySpaces = {
  spaces: Space[];
};

export type ResSpaceEnter = {
  profileImage: string;
  name: string;
  categoryName: string;
};

export type ResMakeSpace = Space & {
  invitationCode: string;
};

/** posts */
export type ResPostCategory = {
  noticeCategories: Category[];
  communityCategories: Category[];
};

/** posts notice */
export type ResNoticePosts = {
  offset: number;
  type: NoticeType;
  posts: NoticePostPreview[];
};

/** posts */
export type ResCommunityPosts = {
  offset: number;
  type: CommunityType;
  posts: CommunityPostPreview[];
};

/** members */
export type ResMemberCategories = {
  myMemberId: number;
  numOfMember: number;
  memberCategories: Category[];
};

export type ResMembers = {
  members: MemberProfilePreviewType[];
};

export type ResMember = SpaceOptionsInfo &
  PickRenameMulti<BaseProfile, { image: 'profileImage' }> & {
    memberCategory: string;
    memberCategoryId: number;
  };
