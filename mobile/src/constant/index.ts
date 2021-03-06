import { MemberProfile } from 'types';
import { normalize } from 'utils';

export const NUM_OF_INVITATION_CODE = 6;
export const INITIAL_INVITATION_CODE = Array.from('-'.repeat(6));

export const PROFILE_TEXT: {
  [key in keyof MemberProfile]: string;
} = {
  name: '이름',
  profileImage: '프로필 사진',
  memberCategory: '소속',
  memberCategoryId: '',
  description: '소개',
  birthdate: '생년월일',
  email: '이메일',
  contact: '휴대전화',
  sns: 'SNS',
  etc: '기타',
};

export const SPACE_MEMBER_INFO_OPTIONS_TEXT = {
  hasBirthdate: '생년월일',
  hasEmail: '이메일',
  hasContact: '휴대전화',
  hasSns: 'SNS',
  hasEtc: '기타',
};

export const HEADER_HEIGHT = normalize(60);

export const POST_ALL_ID = -2;
export const MY_NOTICE_ID = -1;
