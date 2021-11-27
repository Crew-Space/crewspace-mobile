import React from 'react';
import { TouchableOpacity } from 'react-native';

import { ResMember } from 'types/Response';
import { ReqUpdateMyProfile } from 'types/Request';
import { expandMore } from 'assets/svg/icons';
import { GRAY2 } from 'theme/Colors';
import BirthdayInput from 'components/BirthdayInput';
import Text from 'components/Text';
import SvgIcon from 'components/SvgIcon';
import TitleDescribe from './TitleDescribe';

interface Props {
  data: ResMember;
  isMe?: boolean;
  setMyProfile: React.Dispatch<React.SetStateAction<ReqUpdateMyProfile>>;
  myProfile: ReqUpdateMyProfile;
  onChangeText: (text: string, name: string) => void;
}

const ProfileDetails = ({ data, isMe, setMyProfile, myProfile, onChangeText }: Props) => {
  return (
    <>
      <TitleDescribe
        name={'description'}
        contents={data.description}
        editable={isMe}
        onChangeText={onChangeText}
      />
      <TitleDescribe name={'memberCategory'} editable={false}>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Text>{data.memberCategory}</Text>
          <SvgIcon xml={expandMore.right} fill={GRAY2} width={20} />
        </TouchableOpacity>
      </TitleDescribe>
      <TitleDescribe
        name={'email'}
        contents={data.email}
        editable={isMe}
        onChangeText={onChangeText}
      />
      <TitleDescribe name={'sns'} contents={data.sns} editable={isMe} onChangeText={onChangeText} />
      <TitleDescribe name={'birthdate'}>
        <BirthdayInput
          defaultValue={data.birthdate}
          name={'birthdate'}
          editable={isMe}
          onChangeText={onChangeText}
        />
      </TitleDescribe>
    </>
  );
};
export default ProfileDetails;
