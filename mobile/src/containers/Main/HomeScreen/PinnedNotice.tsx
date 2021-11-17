import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { pin } from 'assets/svg/icons';
import { LINE, PRIMARY, WHITE } from 'theme/Colors';
import { PinnedNoticeProps } from 'types';
import { normalize } from 'utils';
import Text from 'components/Text';
import PostHeader from 'components/PostHeader';

const PinnedNotice = ({ header }: PinnedNoticeProps) => (
  <View
    style={{
      width: normalize(280),
      maxWidth: 300,
      backgroundColor: WHITE,
      borderRadius: 8,
      marginHorizontal: 5,
    }}>
    <View style={{ padding: 18, borderBottomColor: LINE, borderBottomWidth: 1 }}>
      <PostHeader {...header} />
    </View>
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SvgXml xml={pin.on} fill={PRIMARY} width={20} style={{ marginRight: 3 }} />
      <Text fontType={'REGULAR_14'} color={PRIMARY}>
        고정
      </Text>
    </View>
  </View>
);

export default PinnedNotice;
