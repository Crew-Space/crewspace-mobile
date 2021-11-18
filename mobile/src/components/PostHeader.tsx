import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { save } from 'assets/svg/icons';
import { GRAY2, PRIMARY } from 'theme/Colors';
import Text from 'components/Text';
import PostCategory from 'components/PostCategory';
import { PostHeaderProps } from 'types';

const PostHeader = ({ subText, Title, isSaved }: PostHeaderProps) => (
  <View>
    <PostCategory {...subText} />
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
      }}>
      {typeof Title === 'string' ? <Text fontType={'BOLD_16'}>{Title}</Text> : <Title />}
      {isSaved !== undefined && (
        <SvgXml xml={isSaved ? save.on : save.off} fill={isSaved ? PRIMARY : GRAY2} width={20} />
      )}
    </View>
  </View>
);

export default PostHeader;
