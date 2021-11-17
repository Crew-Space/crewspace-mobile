import { WelcomeScreenProps, WelcomeScreenType } from 'types/Route';

export const welcomeParams: {
  [key in WelcomeScreenType]: WelcomeScreenProps;
} = {
  makeSpace: {
    title: '해커톤 동아리\n스페이스를 만들었어요',
    mainButtonName: '초대코드 복사하기',
    linkButtonName: '동아리 스페이스로 이동하기',
  },
  enterSpace: {
    mainButtonName: '동아리 스페이스 입장',
    linkButtonName: '초대코드 다시 입력하기',
  },
  beMember: {
    title: '축하해요🎉\n계정을 만들었어요',
    mainButtonName: '동아리 스페이스로 이동하기',
  },
};
