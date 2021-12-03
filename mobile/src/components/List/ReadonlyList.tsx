import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LINE, WHITE } from 'theme/Colors';
import Text from 'components/Text';

interface Props {
  title?: string;
  data: string[];
}

const ReadonlyList = ({ title, data }: Props) => {
  return (
    <View style={styles.container}>
      {!!title && (
        <View style={styles.item}>
          <Text fontType={'BOLD_16'}>{title}</Text>
        </View>
      )}
      {data.map((name, index) => (
        <View key={index} style={styles.item}>
          <Text key={index}>{name}</Text>
        </View>
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
});
export default ReadonlyList;
