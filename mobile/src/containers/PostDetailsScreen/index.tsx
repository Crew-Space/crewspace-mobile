import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/core';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GRAY2, LINE, PRIMARY, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import { PostDetailsScreenPropsType } from 'types/Route';
import {
  useFixNoticeMutation,
  useGetCommunityPostQuery,
  useGetNoticePostQuery,
  useSavePostMutation,
  useUnfixNoticeMutation,
  useUnsavePostMutation,
} from 'store/services/post';
import { CommunityDetailHeader, NoticeDetailHeader } from './PostDetailHeader';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { pin, save } from 'assets/svg/icons';
import { SvgXml } from 'react-native-svg';
import { setPostRead, setPostSave, setPostUnsave } from 'store/slices/posts';

const PostDetailsScreen = () => {
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState<boolean>();
  const [isFixed, setIsFixed] = useState<boolean>();
  const {
    params: { postId, postType },
  } = useRoute<PostDetailsScreenPropsType>();
  const {
    data: noticeData,
    isLoading: noticeLoading,
    isSuccess: noticeSuccess,
  } = useGetNoticePostQuery(postId, {
    skip: postType !== 'notice',
  });
  const {
    data: communityData,
    isLoading: communityLoading,
    isSuccess: communitySuccess,
  } = useGetCommunityPostQuery(postId, {
    skip: postType !== 'community',
  });

  const [savePost, { isSuccess: saveSuccess, isLoading: saveLoading }] = useSavePostMutation();
  const [unsavePost, { isSuccess: unsaveSuccess, isLoading: unsaveLoading }] =
    useUnsavePostMutation();
  const onSavePress = async () => {
    isSaved ? unsavePost(postId) : savePost(postId);
  };

  const [fixPost, { isSuccess: fixSuccess, isLoading: fixLoading }] = useFixNoticeMutation();
  const [unfixPost, { isSuccess: unfixSuccess, isLoading: unfixLoading }] =
    useUnfixNoticeMutation();
  const onFixPress = async () => {
    isFixed ? unfixPost(postId) : fixPost(postId);
  };

  useEffect(() => {
    if (!saveLoading && saveSuccess) {
      dispatch(setPostSave(postId));
      setIsSaved(true);
    }
  }, [saveSuccess, saveLoading]);
  useEffect(() => {
    if (!unsaveLoading && unsaveSuccess) {
      dispatch(setPostUnsave(postId));
      setIsSaved(false);
    }
  }, [unsaveSuccess, unsaveLoading]);

  useEffect(() => {
    if (!fixLoading && fixSuccess) {
      dispatch(setPostSave(postId));
      setIsFixed(true);
    }
  }, [fixSuccess, fixLoading]);
  useEffect(() => {
    if (!unfixLoading && unfixSuccess) {
      dispatch(setPostUnsave(postId));
      setIsFixed(false);
    }
  }, [unfixSuccess, unfixLoading]);

  useEffect(() => {
    if (!noticeLoading && noticeSuccess && noticeData) {
      setIsSaved(noticeData.isSaved);
      setIsFixed(noticeData.isFixed);
    }
  }, [noticeLoading, noticeSuccess]);
  useEffect(() => {
    if (!communityLoading && communitySuccess && communityData) {
      setIsSaved(communityData.isSaved);
    }
  }, [communityLoading, communitySuccess]);

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
        {(postType === 'notice' ? noticeData : communityData)?.images.map((image, index) => {
          console.log(image);
          return (
            <Image
              style={styles.image}
              key={index}
              source={{ uri: image }}
              resizeMode={'contain'}
            />
          );
        })}
      </ScrollView>
      <View style={styles.bottomTabBar}>
        {postType === 'notice' && (
          <TouchableOpacity style={styles.iconButton} onPress={onFixPress}>
            <SvgXml xml={isFixed ? pin.on : pin.off} fill={isFixed ? PRIMARY : GRAY2} width={24} />
            <Text fontType={'REGULAR_12'} color={isFixed ? PRIMARY : GRAY2}>
              고정
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.iconButton} onPress={onSavePress}>
          <SvgXml xml={isSaved ? save.on : save.off} fill={isSaved ? PRIMARY : GRAY2} width={24} />
          <Text fontType={'REGULAR_12'} color={isSaved ? PRIMARY : GRAY2}>
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
  image: {
    width: '100%',
    height: 300,
    marginVertical: 10,
  },
});

export default PostDetailsScreen;
