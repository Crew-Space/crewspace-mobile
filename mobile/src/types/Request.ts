import { NoticeType, CommunityType, SpaceOptionsInfo, BaseProfile, File } from 'types';
import { Modify } from 'utils/types';

/** Space */
export type ReqSpaceEnter = Modify<BaseProfile, { image?: File }> &
  SpaceOptionsInfo & {
    memberCategoryId: number;
  };

/** posts notice */
export type ReqPosts = {
  postCategoryId?: number;
  offset?: number;
  type: NoticeType | CommunityType;
};

/** members */
export type ReqUpdateMyProfile = SpaceOptionsInfo &
  Omit<BaseProfile, 'image'> & { profileImage?: File } & {
    memberCategoryId: number;
  };
