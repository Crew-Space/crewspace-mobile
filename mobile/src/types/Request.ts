import { NoticeType, CommunityType, SpaceOptionsInfo, BaseProfile } from 'types';
import { PickRenameMulti } from 'utils/types';

/** Space */
export type ReqSpaceEnter = SpaceOptionsInfo &
  BaseProfile & {
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
  PickRenameMulti<BaseProfile, { image: 'profileImage' }> & {
    memberCategoryId: number;
  };
