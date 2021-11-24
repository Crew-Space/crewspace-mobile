import React from 'react';
import { TouchableOpacity } from 'react-native';

import { MemberProfile } from 'types';
import { expendMore } from 'assets/svg/icons';
import { GRAY2 } from 'theme/Colors';
import BirthdayInput from 'components/BirthdayInput';
import Text from 'components/Text';
import SvgIcon from 'components/SvgIcon';
import TitleDescribe from './TitleDescribe';

interface Props {
  data: MemberProfile;
  isMe?: boolean;
}

const ProfileDetails = ({ data }: Props) => {
  return (
    <>
      <TitleDescribe name={'description'} contents={data.description} />
      <TitleDescribe name={'memberCategory'}>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Text>{data.memberCategory}</Text>
          <SvgIcon xml={expendMore.right} fill={GRAY2} width={20} />
        </TouchableOpacity>
      </TitleDescribe>
      <TitleDescribe name={'email'} contents={data.email} />
      <TitleDescribe name={'sns'} contents={data.sns} />
      <TitleDescribe name={'birthday'}>
        <BirthdayInput defaultValue={data.birthday} />
      </TitleDescribe>
    </>
  );
};
export default ProfileDetails;
