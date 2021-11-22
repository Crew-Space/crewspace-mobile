import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';
import { GRAY2, LINE, WHITE } from 'theme/Colors';

interface Props {
  text: string;
  subText: string;
  onSubTextPress: () => void;
}

const SectionHeader = ({ text, subText, onSubTextPress }: Props) => {
  return (
    <View style={styles.container}>
      <Text fontType={'BOLD_18'}>{text}</Text>
      <Text fontType={'REGULAR_14'} color={GRAY2} onPress={onSubTextPress}>
        {subText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 19,
    paddingHorizontal: 20,
    borderBottomColor: LINE,
    borderBottomWidth: 1,
    backgroundColor: WHITE,
  },
});

export default SectionHeader;
