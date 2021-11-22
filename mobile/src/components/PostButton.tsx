import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Text from 'components/Text';
import { WHITE, PRIMARY } from 'theme/Colors';
import { normalize } from 'utils';
import { pen } from 'assets/svg/icons';

type PostingType = 'notice' | 'community';
interface Props extends TouchableOpacityProps {
  postingType: PostingType;
}

const PostButton = ({ postingType, ...restProps }: Props) => (
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
    onPress={() => console.log(postingType)}>
    <SvgXml xml={pen} fill={WHITE} width={normalize(16)} style={{ marginRight: 4 }} />
    <Text fontType={'BOLD_14'} color={WHITE}>
      글 쓰기
    </Text>
  </TouchableOpacity>
);

export default PostButton;
