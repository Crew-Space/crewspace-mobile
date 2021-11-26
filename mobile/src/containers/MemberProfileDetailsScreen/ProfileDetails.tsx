import React from 'react';
import { TouchableOpacity } from 'react-native';

import { ResMember } from 'types/Response';
import { expandMore } from 'assets/svg/icons';
import { GRAY2 } from 'theme/Colors';
import BirthdayInput from 'components/BirthdayInput';
import Text from 'components/Text';
import SvgIcon from 'components/SvgIcon';
import TitleDescribe from './TitleDescribe';

interface Props {
  data: ResMember;
  isMe?: boolean;
}

const ProfileDetails = ({ data, isMe }: Props) => {
  return (
    <>
      <TitleDescribe name={'description'} contents={data.description} editable={isMe} />
      <TitleDescribe name={'memberCategory'} editable={false}>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Text>{data.memberCategory}</Text>
          <SvgIcon xml={expandMore.right} fill={GRAY2} width={20} />
        </TouchableOpacity>
      </TitleDescribe>
      <TitleDescribe name={'email'} contents={data.email} editable={isMe} />
      <TitleDescribe name={'sns'} contents={data.sns} editable={isMe} />
      <TitleDescribe name={'birthdate'}>
        <BirthdayInput defaultValue={data.birthdate} name={'birthdate'} editable={isMe} />
      </TitleDescribe>
    </>
  );
};
export default ProfileDetails;
