import { NoticeType, CommunityType, SpaceOptionsInfo, BaseProfile } from 'types';
import { Modify, PickRenameMulti } from 'utils/types';

/** Space */
export type ReqSpaceEnter = Modify<BaseProfile, { image?: string }> &
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
  PickRenameMulti<BaseProfile, { image: 'profileImage' }> & {
    memberCategoryId: number;
  };
