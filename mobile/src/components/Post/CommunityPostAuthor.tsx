import React from 'react';
import { View, ViewProps } from 'react-native';

import { MemberProfilePreviewType } from 'types/Response';
import { GRAY2 } from 'theme/Colors';
import ProfileImage from 'components/ProfileImage';
import Text from 'components/Text';

type Props = Omit<MemberProfilePreviewType, 'memberCategoryId'> & ViewProps;

const CommunityPostAuthor = ({ style, profileImage, name, memberCategory }: Props) => {
  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      <ProfileImage uri={profileImage} width={36} style={{ marginRight: 10 }} />
      <View style={{ justifyContent: 'space-between' }}>
        <Text fontType={'BOLD_14'}>{name}</Text>
        <Text fontType={'REGULAR_11'} color={GRAY2}>
          {memberCategory}
        </Text>
      </View>
    </View>
  );
};

export default CommunityPostAuthor;
