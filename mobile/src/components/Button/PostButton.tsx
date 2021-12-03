import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/core';

import Text from 'components/Text';
import { WHITE, PRIMARY } from 'theme/Colors';
import { normalize } from 'utils';
import { pen } from 'assets/svg/icons';
import { RootRouterParams } from 'types/Route';
import { PostType } from 'types';

interface Props extends TouchableOpacityProps {
  postType: PostType;
}

const PostButton = ({ postType, ...restProps }: Props) => {
  const navigation = useNavigation<RootRouterParams>();

  return (
    <TouchableOpacity
      {...restProps}
      style={{
        backgroundColor: PRIMARY,
        flexDirection: 'row',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 8,
        alignItems: 'center',
      }}
      onPress={() =>
        navigation.navigate('Post', {
          postType,
        })
      }>
      <SvgXml xml={pen} fill={WHITE} width={normalize(16)} style={{ marginRight: 4 }} />
      <Text fontType={'BOLD_14'} color={WHITE}>
        글 쓰기
      </Text>
    </TouchableOpacity>
  );
};

export default PostButton;
