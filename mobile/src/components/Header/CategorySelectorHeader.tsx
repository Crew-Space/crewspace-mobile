import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Category } from 'types';
import { expandMore, settings } from 'assets/svg/icons';
import { BLACK, LINE, WHITE } from 'theme/Colors';
import { SCREEN_HEIGHT } from 'theme/Metrics';
import { setCategory } from 'store/slices/screen';
import { postApi, useGetPostCategoriesQuery } from 'store/services/post';
import SvgIcon from 'components/SvgIcon';
import Text from 'components/Text';
import useHeaderAnimation from 'hooks/useHeaderAnimation';
import { HEADER_HEIGHT } from 'constant';
import { RootRouterParams } from 'types/Route';

const CategorySelectorHeader = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootRouterParams>();
  const tabName = useSelector((state) => state.screen.tabName);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const currentCategory = useSelector((state) => state.screen.category);
  const { data, isSuccess, isFetching } = useGetPostCategoriesQuery();
  const [categories, setCategories] = useState<Category[]>([]);

  const [translateAnim, fadeAnim, expanded, toggleExpaned] = useHeaderAnimation(categories.length);

  useEffect(() => {
    if (!isFetching && isSuccess && data) {
      switch (tabName) {
        case 'Notice':
          setCategories(data.noticeCategories);
          dispatch(postApi.util.invalidateTags(['NoticePost']));
          dispatch(setCategory(data.noticeCategories[0]));
          break;
        case 'Community':
          setCategories(data.communityCategories);
          dispatch(postApi.util.invalidateTags(['CommunityPost']));
          dispatch(setCategory(data.communityCategories[0]));
          break;
      }
    }
  }, [data, isSuccess, isFetching, tabName]);

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
              top: '-100%',
            },
          ]}>
          {categories
            .filter((category) => category.categoryId !== currentCategory.categoryId)
            .map((category) => (
              <View
                key={category.categoryId}
                style={[styles.itemContainer, { height: HEADER_HEIGHT }]}
                onTouchEnd={() => {
                  dispatch(setCategory(category));
                  toggleExpaned();
                }}>
                <Text fontType={'BOLD_18'}>{category.categoryName}</Text>
              </View>
            ))}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentItemContainer: {
    zIndex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    justifyContent: 'space-between',
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
