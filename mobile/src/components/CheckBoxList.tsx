import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BLACK, GRAY2, LINE, WHITE } from 'theme/Colors';
import CheckBox from './CheckBox';
import Text from './Text';

interface Props {
  title?: string;
  data: string[];
  value: { key: string; value: boolean }[];
  onValueChange: (value: { key: string; value: boolean }[]) => void;
  fill?: string;
  width?: number;
}

const CheckBoxList = ({ title, data, value, onValueChange, fill = BLACK, width = 24 }: Props) => {
  return (
    <View style={styles.container}>
      {!!title && (
        <View style={styles.item}>
          <Text fontType={'BOLD_16'}>{title}</Text>
        </View>
      )}
      {data.map((name, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.item, styles.checkList]}
          onPress={() => {
            onValueChange([
              ...value.slice(0, index),
              { ...value[index], value: !value[index].value },
              ...value.slice(index + 1),
            ]);
          }}>
          <CheckBox isChecked={value[index].value} width={width} fill={fill} />
          <Text key={index} color={value[index].value ? fill : GRAY2} style={styles.checkText}>
            {name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
  },
  item: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomColor: LINE,
    borderBottomWidth: 1,
  },
  checkList: {
    flexDirection: 'row',
  },
  checkText: {
    marginLeft: 8,
  },
});
export default CheckBoxList;
