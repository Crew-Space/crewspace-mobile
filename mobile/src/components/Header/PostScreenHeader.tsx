import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { RootRouterParams } from 'types/Route';
import SvgIcon from 'components/SvgIcon';
import { close, expandMore } from 'assets/svg/icons';
import Text from 'components/Text';
import { BLACK, LINE, PRIMARY, WHITE } from 'theme/Colors';
import { SCREEN_HEIGHT } from 'theme/Metrics';
import { useLazyGetPostCategoriesQuery, usePostCommunityMutation } from 'store/services/post';
import { Category } from 'types';
import TouchableText from 'components/TouchableText';
import useHeaderAnimation from 'hooks/useHeaderAnimation';
import { HEADER_HEIGHT } from 'constant';

const PostScreenHeader = () => {
  const navigation = useNavigation<RootRouterParams>();
  const [getPostCategories, { data, isSuccess, isLoading, isFetching }] =
    useLazyGetPostCategoriesQuery();

  const [selectedCategory, setSelectedCategory] = useState<Category>({
    categoryId: -1,
    categoryName: '',
  });
  const currentSpaceId = useSelector((state) => state.space.current.spaceId);
  const tabName = useSelector((state) => state.screen.tabName);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryLength, setCategoryLength, translateAnim, fadeAnim, expanded, toggleExpaned] =
    useHeaderAnimation();

  const [communityPost] = usePostCommunityMutation();
  const newPost = useSelector((state) => state.newPost);

  useEffect(() => {
    getPostCategories();
  }, [currentSpaceId]);

  useEffect(() => {
    if (!isLoading && isSuccess && !isFetching && data) {
      const categoryData = (
        tabName === 'Notice' ? data.noticeCategories : data.communityCategories
      ).filter((category) => category.categoryId > 0);
      console.log(tabName, categoryData);
      setCategories(categoryData);
      setSelectedCategory(categoryData[0]);
      setCategoryLength(categoryData.length);
    }
  }, [isLoading, isSuccess, isFetching]);

  useEffect(() => {
    getPostCategories();
  }, []);

  if (!data) return <></>;

  return (
    <>
      {expanded && (
        <Animated.View
          style={[styles.background, { opacity: fadeAnim }]}
          onTouchEnd={() => toggleExpaned()}
        />
      )}
      <View style={{ height: getStatusBarHeight(), backgroundColor: WHITE, zIndex: 1 }} />
      <View>
        <View style={[styles.itemContainer, styles.container, { height: HEADER_HEIGHT }]}>
          <SvgIcon xml={close} width={24} onPress={() => navigation.goBack()} />
          <View style={styles.title} onTouchEnd={() => toggleExpaned()}>
            <Text fontType={'BOLD_18'}>{selectedCategory.categoryName}</Text>
            <SvgIcon xml={!expanded ? expandMore.down : expandMore.up} width={20} />
          </View>
          <TouchableText
            color={PRIMARY}
            onPress={() => {
              communityPost({ postCategoryId: selectedCategory.categoryId, ...newPost });
              navigation.goBack();
            }}>
            등록
          </TouchableText>
        </View>
        <Animated.View
          style={[
            styles.expandList,
            {
              transform: [{ translateY: translateAnim }],
              top: -categoryLength * HEADER_HEIGHT,
            },
          ]}>
          {categories
            .filter((category) => category.categoryId !== selectedCategory.categoryId)
            .map((category) => (
              <View
                key={category.categoryId}
                style={[styles.itemContainer, { height: HEADER_HEIGHT }]}
                onTouchEnd={() => {
                  setSelectedCategory(category);
                  toggleExpaned();
                }}>
                <Text fontType={'BOLD_18'}>{category.categoryName}</Text>
              </View>
            ))}
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  itemContainer: {
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandList: {
    zIndex: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    backgroundColor: BLACK,
    opacity: 0.3,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT,
  },
});

export default PostScreenHeader;
