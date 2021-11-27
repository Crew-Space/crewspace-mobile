import React from 'react';
import { View } from 'react-native';

import { save } from 'assets/svg/icons';
import { GRAY2, PRIMARY } from 'theme/Colors';
import Text from 'components/Text';
import PostCategory from 'components/PostCategory';
import { PostHeaderProps } from 'types';
import SvgIcon from 'components/SvgIcon';
import { postApi, useSavePostMutation, useUnsavePostMutation } from 'store/services/post';

type Props = PostHeaderProps & { postId: number };

const PostHeader = ({ subText, Title, isSaved, postId }: Props) => {
  const [savePost] = useSavePostMutation();
  const [unsavePost] = useUnsavePostMutation();

  const onPress = async () => {
    console.log(isSaved);
    isSaved ? unsavePost(postId) : savePost(postId);
  };

  return (
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
          <SvgIcon
            xml={isSaved ? save.on : save.off}
            fill={isSaved ? PRIMARY : GRAY2}
            width={20}
            onPress={onPress}
          />
        )}
      </View>
    </View>
  );
};

export default PostHeader;
