import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootRouterParamList = {
  Auth: undefined;
  Contents: undefined;
};

export type ContentsRouterParamList = {
  Invitation: undefined;
  Main: undefined;
  Post: undefined;
  EditCategory: undefined;
  PostDetails: undefined;
  Search: undefined;
};

export type InvitationParamList = {
  SpaceCode: undefined;
  CreateSpace: undefined;
  EnterSpace: undefined;
};

export type MainRouterParamList = {
  Home: undefined;
  Notice: undefined;
  Community: undefined;
  MemberList: undefined;
  Settings: undefined;
};

export type SettingsParamList = {
  Settings: undefined;
};

export type SearchParamList = {
  Search: undefined;
  MemberDetails: undefined;
};

export type RootRouterParams = StackNavigationProp<RootRouterParamList>;
export type ContentsRouterParams = StackNavigationProp<ContentsRouterParamList>;
export type InvitationParams = BottomTabNavigationProp<InvitationParamList>;
export type MainRouterParams = BottomTabNavigationProp<MainRouterParamList>;
export type SearchParams = StackNavigationProp<SearchParamList>;
export type SettingsParams = StackNavigationProp<SettingsParamList>;
