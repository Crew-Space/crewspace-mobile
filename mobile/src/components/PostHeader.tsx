import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { save } from 'assets/svg/icons';
import { GRAY2, PRIMARY } from 'theme/Colors';
import Text from 'components/Text';
import PostCategory from 'components/PostCategory';
import { PostHeaderProps } from 'types';

const PostHeader = ({ subText, title, isSaved }: PostHeaderProps) => (
  <View>
    <PostCategory {...subText} />
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text fontType={'BOLD_16'} style={{ marginTop: 5 }}>
        {title}
      </Text>
      {isSaved !== undefined && (
        <SvgXml xml={isSaved ? save.on : save.off} fill={isSaved ? PRIMARY : GRAY2} width={20} />
      )}
    </View>
  </View>
);

export default PostHeader;
