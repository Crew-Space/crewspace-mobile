import React from 'react';
import { TouchableHighlightProps, View, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { check } from 'assets/svg/icons';
import { PostPreviewProps } from 'types';
import { normalize } from 'utils';
import { GRAY1, GRAY2, GRAY4, LINE, PRIMARY, WHITE } from 'theme/Colors';

import Text from 'components/Text';
import PostHeader from './PostHeader';

type Props = PostPreviewProps & TouchableHighlightProps;

const PostPreview = ({
  header,
  description,
  isSaved,
  viewed,
  postId,
  image,
  ...restProps
}: Props) => (
  <TouchableHighlight {...restProps} underlayColor={GRAY4} style={styles.container}>
    <>
      <PostHeader {...header} isSaved={isSaved} postId={postId} />
      <View style={styles.contents}>
        <View style={{ flex: 1 }}>
          <Text
            paragraph
            fontType={'REGULAR_14'}
            color={GRAY1}
            numberOfLines={3}
            ellipsizeMode='tail'>
            {`${description.replace(/\n/g, '')}`}
          </Text>
        </View>
        {!!image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      {viewed !== undefined && (
        <View style={styles.viewed}>
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: WHITE,
    borderBottomColor: LINE,
    borderBottomWidth: 1,
  },
  contents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  image: {
    borderRadius: 8,
    overflow: 'hidden',
    width: normalize(63),
    height: normalize(63),
    resizeMode: 'cover',
    marginLeft: 10,
  },
  viewed: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default PostPreview;
