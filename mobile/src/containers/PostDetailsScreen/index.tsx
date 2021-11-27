import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/core';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GRAY2, LINE, PRIMARY, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import { PostDetailsScreenPropsType } from 'types/Route';
import { useGetCommunityPostQuery, useGetNoticePostQuery } from 'store/services/post';
import { CommunityDetailHeader, NoticeDetailHeader } from './PostDetailHeader';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { pin, save } from 'assets/svg/icons';
import { SvgXml } from 'react-native-svg';
import { setPostRead } from 'store/slices/posts';

const PostDetailsScreen = () => {
  const dispatch = useDispatch();
  const {
    params: { postId, postType },
  } = useRoute<PostDetailsScreenPropsType>();
  const { data: noticeData } = useGetNoticePostQuery(postId, { skip: postType !== 'notice' });
  const { data: communityData } = useGetCommunityPostQuery(postId, {
    skip: postType !== 'community',
  });

  useEffect(() => {
    dispatch(setPostRead(postId));
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ marginBottom: 30 }}>
          {postType === 'notice' && noticeData && (
            <NoticeDetailHeader
              categoryName={noticeData.categoryName}
              writtenDate={noticeData.writtenDate}
              title={noticeData.title}
              targets={noticeData.targets}
            />
          )}
          {postType === 'community' && communityData && (
            <CommunityDetailHeader
              categoryName={communityData.categoryName}
              writtenDate={communityData.writtenDate}
              author={communityData}
            />
          )}
        </View>
        <Text paragraph>
          {postType === 'notice' ? noticeData?.description : communityData?.description}
        </Text>
        {(postType === 'notice' ? noticeData : communityData)?.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={{ width: '100%' }} />
        ))}
      </ScrollView>
      <View style={styles.bottomTabBar}>
        {postType === 'notice' && (
          <TouchableOpacity style={styles.iconButton}>
            <SvgXml
              xml={noticeData?.isFixed ? pin.on : pin.off}
              fill={noticeData?.isFixed ? PRIMARY : GRAY2}
              width={24}
            />
            <Text fontType={'REGULAR_12'} color={noticeData?.isFixed ? PRIMARY : GRAY2}>
              고정
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.iconButton}>
          <SvgXml
            xml={(postType === 'notice' ? noticeData : communityData)?.isSaved ? save.on : save.off}
            fill={(postType === 'notice' ? noticeData : communityData)?.isSaved ? PRIMARY : GRAY2}
            width={24}
          />
          <Text
            fontType={'REGULAR_12'}
            color={(postType === 'notice' ? noticeData : communityData)?.isSaved ? PRIMARY : GRAY2}>
            저장
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: WHITE,
  },
  scrollContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: getBottomSpace(),
  },
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    borderTopColor: LINE,
    borderTopWidth: 1,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostDetailsScreen;
