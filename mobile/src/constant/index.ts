import { MemberProfile } from 'types';

export const GUIDELINE_BASE_WIDTH = 375;

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
