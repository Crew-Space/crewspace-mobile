import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type RootRouterParamList = {
  Auth: undefined;
  Contents: undefined;
  Invitation: {
    screen: keyof InvitationParamList;
  };
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
  Welcome: {
    darkTheme?: boolean;
    data: ScreenProps;
  };
};

type ProfileType = {
  name: string;
  imageUrl: string;
  description: string;
};

interface ScreenProps {
  title?: string;
  profile: ProfileType;
  mainButtonName: string;
  linkButtonName?: string;
  spaceInvitationCode?: string;
}

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
export type InvitationParams = StackNavigationProp<InvitationParamList>;
export type MainRouterParams = BottomTabNavigationProp<MainRouterParamList>;
export type SearchParams = StackNavigationProp<SearchParamList>;
export type SettingsParams = StackNavigationProp<SettingsParamList>;

/*** WelcomScreen ***/
export type WelcomScreenType = 'makeSpace' | 'enterSpace' | 'beMember';
export type WelcomScreenProps = RouteProp<InvitationParamList, 'Welcome'>;
