import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { PostType, Space } from 'types';

export type RootRouterParamList = {
  Auth: undefined;
  Contents: undefined;
  Invitation: NavigatorScreenParams<InvitationParamList> | undefined;
  Main: NavigatorScreenParams<MainRouterParamList> | undefined;
  Post: { postType: PostType };
  EditCategory: undefined;
  PostDetails: {
    postType: PostType;
    postId: number;
  };
  Search: {
    searchType: 'post' | 'member';
  };
  MemberProfileDetails: {
    memberId: number;
    isMe?: boolean;
  };
};

export type InvitationParamList = {
  SpaceCode: undefined;
  CreateSpace: undefined;
  EnterSpace: {
    space: Space;
  };
  MakeSpace: undefined;
  Welcome: {
    darkTheme?: boolean;
    data: WelcomeScreenProps;
  };
};

export type MainRouterParamList = {
  Home: undefined;
  Notice: undefined;
  Community: undefined;
  MemberList: undefined;
  Settings: undefined;
};

export type SettingsParamList = {
  SettingHome: undefined;
};

export type RootRouterParams = StackNavigationProp<RootRouterParamList>;
export type InvitationParams = StackNavigationProp<InvitationParamList>;
export type MainRouterParams = BottomTabNavigationProp<MainRouterParamList>;
export type SettingsParams = StackNavigationProp<SettingsParamList>;

/*** WelcomScreen ***/
export type WelcomeScreenType = 'makeSpace' | 'enterSpace' | 'beMember';
export type WelcomeScreenPropsType = RouteProp<InvitationParamList, 'Welcome'>;

type ProfileType = {
  name: string;
  imageUrl: string;
  description: string;
};

export type WelcomeScreenBaseProps = {
  title?: string;
  profile?: ProfileType;
  mainButtonName: string;
  linkButtonName?: string;
};

export type EnterScreenBaseProps = {
  spaceInvitationCode?: string;
  space?: Space;
};

export type WelcomeScreenProps = WelcomeScreenBaseProps & EnterScreenBaseProps;

/*** PostScreen ***/
export type PostScreenPropsType = RouteProp<RootRouterParamList, 'Post'>;

/*** MemberProfileDetailsScreen ***/
export type MemberProfileDetailsScreenPropsType = RouteProp<
  RootRouterParamList,
  'MemberProfileDetails'
>;

/*** PostDetails ***/
export type PostDetailsScreenPropsType = RouteProp<RootRouterParamList, 'PostDetails'>;

/*** EnterSpace ***/
export type EnterSpaceScreenPropsType = RouteProp<InvitationParamList, 'EnterSpace'>;
