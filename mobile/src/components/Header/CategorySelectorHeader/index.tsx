import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { expandMore, settings } from 'assets/svg/icons';
import { Category } from 'types';
import { RootRouterParams } from 'types/Route';
import { HEADER_HEIGHT } from 'constant';
import { BLACK, LINE, WHITE } from 'theme/Colors';
import { SCREEN_HEIGHT } from 'theme/Metrics';
import useHeaderAnimation from 'hooks/useHeaderAnimation';
import { setCategory } from 'store/slices/screen';
import { postApi, useLazyGetPostCategoriesQuery } from 'store/services/post';

import SvgIcon from 'components/SvgIcon';
import Text from 'components/Text';
import CategoryItem from './CategoryItem';

const CategorySelectorHeader = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootRouterParams>();
  const [categories, setCategories] = useState<Category[]>([]);

  const tabName = useSelector((state) => state.screen.tabName);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const currentSpaceId = useSelector((state) => state.space.current.spaceId);
  const currentCategory = useSelector((state) => state.screen.category);

  const [getPostCategories, { data, isSuccess, isFetching }] = useLazyGetPostCategoriesQuery();
  const [categoryLength, setCategoryLength, translateAnim, fadeAnim, expanded, toggleExpaned] =
    useHeaderAnimation();

  useEffect(() => {
    getPostCategories();
  }, [currentSpaceId]);

  useEffect(() => {
    if (!isFetching && isSuccess && data) {
      const categoryData = tabName === 'Notice' ? data.noticeCategories : data.communityCategories;
      setCategoryLength(categoryData.length);
      setCategories(categoryData);
      dispatch(
        postApi.util.invalidateTags([tabName === 'Notice' ? 'NoticePost' : 'CommunityPost']),
      );
      dispatch(setCategory(categoryData[0]));
    }
  }, [data, isSuccess, isFetching, tabName]);

  useEffect(() => {
    getPostCategories();
  }, []);

  if (!(tabName === 'Notice' || tabName === 'Community')) return <></>;

  return (
    <View>
      {expanded && (
        <Animated.View
          style={[styles.background, { opacity: fadeAnim }]}
          onTouchEnd={() => toggleExpaned()}
        />
      )}
      <View style={{ height: getStatusBarHeight(), backgroundColor: WHITE, zIndex: 1 }} />
      <View>
        <View
          style={[styles.currentItemContainer, styles.itemContainer, { height: HEADER_HEIGHT }]}>
          <View style={styles.title} onTouchEnd={() => toggleExpaned()}>
            <Text fontType={'BOLD_18'}>{currentCategory.categoryName}</Text>
            <SvgIcon xml={!expanded ? expandMore.down : expandMore.up} width={20} disabled />
          </View>
          {isAdmin && (
            <SvgIcon
              xml={settings.off}
              fill={BLACK}
              width={24}
              onPress={() => {
                navigation.navigate('EditCategory');
              }}
            />
          )}
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
            .filter((category) => category.categoryId !== currentCategory.categoryId)
            .map((category) => (
              <CategoryItem
                key={category.categoryId}
                category={category}
                toggleExpaned={toggleExpaned}
                tabName={tabName}
              />
            ))}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentItemContainer: {
    zIndex: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
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

export default CategorySelectorHeader;
