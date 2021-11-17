import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { PostPreviewProps } from 'types';
import { GRAY1, GRAY2, PRIMARY, WHITE } from 'theme/Colors';
import { check } from 'assets/svg/icons';
import Text from 'components/Text';
import PostHeader from 'components/PostHeader';

const PostPreview = ({ header, description, isSaved, viewed }: PostPreviewProps) => (
  <View
    style={{
      paddingVertical: 18,
      paddingHorizontal: 20,
      backgroundColor: WHITE,
    }}>
    <PostHeader {...header} isSaved={isSaved} />
    <Text paragraph fontType={'REGULAR_14'} color={GRAY1} style={{ marginTop: 10 }}>
      {description}
    </Text>
    {viewed !== undefined && (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        <SvgXml xml={check} fill={viewed ? PRIMARY : GRAY2} width={14} style={{ marginRight: 4 }} />
        <Text fontType={'REGULAR_12'} color={viewed ? PRIMARY : GRAY2}>
          읽음
        </Text>
      </View>
    )}
  </View>
);

export default PostPreview;
