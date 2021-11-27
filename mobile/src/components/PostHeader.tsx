import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { save } from 'assets/svg/icons';
import { GRAY2, PRIMARY } from 'theme/Colors';
import Text from 'components/Text';
import PostCategory from 'components/PostCategory';
import { PostHeaderProps } from 'types';
import SvgIcon from 'components/SvgIcon';
import { useSavePostMutation, useUnsavePostMutation } from 'store/services/post';
import { setPostSave, setPostUnsave } from 'store/slices/posts';

type Props = PostHeaderProps & { postId: number };

const PostHeader = ({ subText, Title, isSaved, postId }: Props) => {
  const dispatch = useDispatch();
  const [savePost, { isSuccess: saveSuccess, isLoading: saveLoading }] = useSavePostMutation();
  const [unsavePost, { isSuccess: unsaveSuccess, isLoading: unsaveLoading }] =
    useUnsavePostMutation();

  const onPress = async () => {
    isSaved ? unsavePost(postId) : savePost(postId);
  };

  useEffect(() => {
    if (!saveLoading && saveSuccess) {
      dispatch(setPostSave(postId));
    }
  }, [saveSuccess, saveLoading]);

  useEffect(() => {
    if (!unsaveLoading && unsaveSuccess) {
      dispatch(setPostUnsave(postId));
    }
  }, [unsaveSuccess, unsaveLoading]);

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
