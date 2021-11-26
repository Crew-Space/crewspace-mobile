import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import SvgIcon from 'components/SvgIcon';
import { expandMore } from 'assets/svg/icons';
import Text from 'components/Text';
import { BLACK, LINE, WHITE } from 'theme/Colors';
import { normalize } from 'utils';
import { SCREEN_HEIGHT } from 'theme/Metrics';
import { Category } from 'types/Response';
import { setCategory } from 'store/slices/screen';
import { useGetPostCategoriesQuery } from 'store/services/post';

const HEADER_HEIGHT = normalize(60);

const CategorySelectorHeader = () => {
  const dispatch = useDispatch();
  const tabName = useSelector((state) => state.screen.tabName);
  const currentCategory = useSelector((state) => state.screen.category);
  const { data, isSuccess } = useGetPostCategoriesQuery();
  const [categories, setCategories] = useState<Category[]>([]);

  const [extanded, setExtanded] = useState<boolean>(false);
  const translateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSuccess && data) {
      switch (tabName) {
        case 'Notice':
          setCategories(data.noticeCategories);
          dispatch(setCategory(data.noticeCategories[0]));
          break;
        case 'Community':
          setCategories(data.communityCategories);
          dispatch(setCategory(data.communityCategories[0]));
          break;
      }
    }
  }, [data, isSuccess, tabName]);

  useEffect(() => {
    if (!extanded) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: HEADER_HEIGHT * (categories.length + 1),
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [extanded]);

  if (!(tabName === 'Notice' || tabName === 'Community')) return <></>;

  return (
    <>
      {extanded && (
        <Animated.View
          style={[styles.background, { opacity: fadeAnim }]}
          onTouchEnd={() => setExtanded(!extanded)}
        />
      )}
      <View style={{ height: getStatusBarHeight(), backgroundColor: WHITE, zIndex: 1 }} />
      <View>
        <View style={[styles.itemContainer, styles.container]}>
          <View style={styles.title} onTouchEnd={() => setExtanded(!extanded)}>
            <Text fontType={'BOLD_18'}>{currentCategory.categoryName}</Text>
            <SvgIcon xml={!extanded ? expandMore.down : expandMore.up} width={20} disabled />
          </View>
        </View>
        <Animated.View
          style={[
            styles.expandList,
            {
              transform: [{ translateY: translateAnim }],
              top: -(HEADER_HEIGHT * categories.length),
            },
          ]}>
          {categories
            .filter((category) => category.categoryId !== currentCategory.categoryId)
            .map((category) => (
              <View
                key={category.categoryId}
                style={styles.itemContainer}
                onTouchEnd={() => {
                  dispatch(setCategory(category));
                  setExtanded(!extanded);
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
    alignItems: 'flex-start',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    height: HEADER_HEIGHT,
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

export default CategorySelectorHeader;
