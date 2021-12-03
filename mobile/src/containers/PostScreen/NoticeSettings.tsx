import { CheckBox } from 'components/CheckBox';
import ChipList from 'components/List/ChipList';
import Text from 'components/Text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GRAY1, GRAY2, PRIMARY } from 'theme/Colors';
import { Category } from 'types';

interface Props {
  membersCategories: Category[];
  onValueChange: (value: boolean[]) => void;
}

const NoticeSettings = ({ membersCategories, onValueChange }: Props) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text} color={GRAY1}>
          공지 대상
        </Text>
        <ChipList
          data={membersCategories.map((category) => category.categoryName)}
          onValueChange={onValueChange}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text} color={GRAY1}>
          등록 시간
        </Text>
        <View style={styles.checkList}>
          <View style={styles.checkItem}>
            <CheckBox isChecked={true} fill={PRIMARY} />
            <Text style={{ marginLeft: 6 }} color={PRIMARY}>
              현재
            </Text>
          </View>
          <View style={styles.checkItem}>
            <CheckBox isChecked={false} />
            <Text style={{ marginLeft: 6 }} color={GRAY2}>
              예약
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
  },
  text: {
    marginBottom: 12,
  },
  checkItem: {
    flexDirection: 'row',
    marginRight: 20,
  },
  checkList: {
    flexDirection: 'row',
  },
});

export default NoticeSettings;
