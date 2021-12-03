import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';

import { info } from 'assets/svg/icons';
import { HEADER_HEIGHT, MY_NOTICE_ID } from 'constant';
import { Category } from 'types';
import { MainRouterParamList } from 'types/Route';
import { GRAY4, LINE, PRIMARY, WHITE } from 'theme/Colors';
import { setCategory } from 'store/slices/screen';
import Text from 'components/Text';

interface Props {
  category: Category;
  toggleExpaned: () => void;
  tabName: keyof MainRouterParamList | 'Post';
}

const CategoryItem = ({ category, toggleExpaned, tabName }: Props) => {
  const dispatch = useDispatch();

  return (
    <TouchableHighlight
      underlayColor={GRAY4}
      key={category.categoryId}
      style={[styles.itemContainer, { height: HEADER_HEIGHT }]}
      onPress={() => {
        dispatch(setCategory(category));
        toggleExpaned();
      }}>
      <>
        <View>
          <Text fontType={'BOLD_18'}>{category.categoryName}</Text>
        </View>
        {tabName === 'Notice' && category.categoryId === MY_NOTICE_ID && (
          <View style={styles.myNotice}>
            <SvgXml xml={info} width={16} fill={PRIMARY} style={{ marginRight: 4 }} />
            <View style={{ justifyContent: 'center' }}>
              <Text fontType={'REGULAR_14'} color={PRIMARY}>
                내게 필요한 공지만 모아볼 수 있어요
              </Text>
            </View>
          </View>
        )}
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  myNotice: {
    marginLeft: 8,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default CategoryItem;
