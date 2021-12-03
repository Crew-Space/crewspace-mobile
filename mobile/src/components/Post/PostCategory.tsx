import React from 'react';
import { View } from 'react-native';

import Text from 'components/Text';
import { GRAY2, PRIMARY } from 'theme/Colors';
import { PostHeaderSubTextProps } from 'types';

const PostCategory = ({ left, right }: PostHeaderSubTextProps) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text fontType={'REGULAR_11'} color={PRIMARY}>
      {left}
    </Text>
    <Text fontType={'REGULAR_11'} color={GRAY2}>
      {right}
    </Text>
  </View>
);

export default PostCategory;
