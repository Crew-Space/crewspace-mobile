import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableHighlightProps, View } from 'react-native';

import { MemberProfilePreviewType } from 'types';
import { GRAY2, GRAY4, WHITE } from 'theme/Colors';
import { expandMore, pen } from 'assets/svg/icons';
import Text from 'components/Text';
import ProfileImage from 'components/ProfileImage';
import SvgIcon from 'components/SvgIcon';

type Props = Omit<MemberProfilePreviewType, 'memberId'> & {
  me?: boolean;
} & TouchableHighlightProps;

const MemberProfilePreview = ({ profileImage, memberCategory, name, me, ...restProps }: Props) => {
  return (
    <TouchableHighlight
      underlayColor={GRAY4}
      {...restProps}
      style={[styles.flexRowCenter, styles.container]}>
      <>
        <View style={styles.flexRowCenter}>
          <ProfileImage uri={profileImage} width={50} />
          <View style={{ marginLeft: 14 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text fontType={'BOLD_16'}>{name}</Text>
              {me && (
                <SvgIcon disabled xml={pen} fill={GRAY2} width={16} style={{ marginLeft: 4 }} />
              )}
            </View>
            <Text fontType={'REGULAR_14'} color={GRAY2}>
              {memberCategory}
            </Text>
          </View>
        </View>
        <SvgIcon disabled xml={expandMore.right} width={20} fill={GRAY2} />
      </>
    </TouchableHighlight>
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
