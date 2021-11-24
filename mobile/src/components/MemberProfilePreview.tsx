import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';
import { GRAY2, WHITE } from 'theme/Colors';
import ProfileImage from './ProfileImage';
import { MemberProfilePreviewType } from 'types';
import SvgIcon from './SvgIcon';
import { expendMore, pen } from 'assets/svg/icons';

type Props = Omit<MemberProfilePreviewType, 'memberId'> & { me?: boolean };

const MemberProfilePreview = ({ profileImage, memberCategory, name, me }: Props) => {
  return (
    <View style={[styles.flexRowCenter, styles.container]}>
      <View style={styles.flexRowCenter}>
        <ProfileImage uri={profileImage} width={50} />
        <View style={{ marginLeft: 14 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text fontType={'BOLD_16'}>{name}</Text>
            {me && <SvgIcon disabled xml={pen} fill={GRAY2} width={16} style={{ marginLeft: 4 }} />}
          </View>
          <Text fontType={'REGULAR_14'} color={GRAY2}>
            {memberCategory}
          </Text>
        </View>
      </View>
      <SvgIcon disabled xml={expendMore.right} width={20} fill={GRAY2} />
    </View>
  );
};

const styles = StyleSheet.create({
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
});

export default MemberProfilePreview;
