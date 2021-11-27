import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { RootRouterParams } from 'types/Route';
import SvgIcon from 'components/SvgIcon';
import { close, expandMore } from 'assets/svg/icons';
import Text from 'components/Text';
import { BLACK, LINE, PRIMARY, WHITE } from 'theme/Colors';
import { normalize } from 'utils';
import { SCREEN_HEIGHT } from 'theme/Metrics';
import { useGetPostCategoriesQuery, usePostCommunityMutation } from 'store/services/post';
import { Category } from 'types/Response';
import TouchableText from 'components/TouchableText';

const HEADER_HEIGHT = normalize(60);

const PostScreenHeader = () => {
  const navigation = useNavigation<RootRouterParams>();
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    categoryId: -1,
    categoryName: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const { data, isSuccess, isLoading, isFetching } = useGetPostCategoriesQuery();
  const [communityPost] = usePostCommunityMutation();
  const newPost = useSelector((state) => state.newPost);

  const [extanded, setExtanded] = useState<boolean>(false);
  const translateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isLoading && isSuccess && !isFetching && data) {
      setCategories(data.communityCategories.slice(1));
      setSelectedCategory(data.communityCategories[1]);
    }
  }, [isLoading, isSuccess, isFetching]);

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

  if (!data) return <></>;

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
          <SvgIcon xml={close} width={24} onPress={() => navigation.goBack()} />
          <View style={styles.title} onTouchEnd={() => setExtanded(!extanded)}>
            <Text fontType={'BOLD_18'}>{selectedCategory.categoryName}</Text>
            <SvgIcon xml={!extanded ? expandMore.down : expandMore.up} width={20} />
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
              top: -(HEADER_HEIGHT * categories.length),
            },
          ]}>
          {categories
            .filter((category) => category.categoryId !== selectedCategory.categoryId)
            .map((category) => (
              <View
                key={category.categoryId}
                style={styles.itemContainer}
                onTouchEnd={() => {
                  setSelectedCategory(category);
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
    alignItems: 'center',
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

export default PostScreenHeader;
