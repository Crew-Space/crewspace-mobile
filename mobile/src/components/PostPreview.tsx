import React from 'react';
import { TouchableHighlightProps, View, TouchableHighlight } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { PostPreviewProps } from 'types';
import { GRAY1, GRAY2, GRAY4, LINE, PRIMARY, WHITE } from 'theme/Colors';
import { check } from 'assets/svg/icons';
import Text from 'components/Text';
import PostHeader from 'components/PostHeader';

type Props = PostPreviewProps & TouchableHighlightProps;

const PostPreview = ({ header, description, isSaved, viewed, postId, ...restProps }: Props) => (
  <TouchableHighlight
    {...restProps}
    underlayColor={GRAY4}
    style={{
      paddingVertical: 18,
      paddingHorizontal: 20,
      backgroundColor: WHITE,
      borderBottomColor: LINE,
      borderBottomWidth: 1,
    }}>
    <>
      <PostHeader {...header} isSaved={isSaved} postId={postId} />
      <Text paragraph fontType={'REGULAR_14'} color={GRAY1} style={{ marginTop: 10 }}>
        {`${description.slice(0, 100)}...`}
      </Text>
      {viewed !== undefined && (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <SvgXml
            xml={check}
            fill={viewed ? PRIMARY : GRAY2}
            width={14}
            style={{ marginRight: 4 }}
          />
          <Text fontType={'REGULAR_12'} color={viewed ? PRIMARY : GRAY2}>
            읽음
          </Text>
        </View>
      )}
    </>
  </TouchableHighlight>
);

export default PostPreview;
