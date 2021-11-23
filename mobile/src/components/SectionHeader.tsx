import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';
import { GRAY2, LINE, WHITE } from 'theme/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  text: string;
  LeftButton: string | React.FunctionComponent;
  onLeftButtonPress: () => void;
}

const SectionHeader = ({ text, LeftButton, onLeftButtonPress }: Props) => {
  return (
    <View style={styles.container}>
      <Text fontType={'BOLD_18'}>{text}</Text>
      <TouchableOpacity onPress={onLeftButtonPress}>
        {typeof LeftButton === 'string' ? (
          <Text fontType={'REGULAR_14'} color={GRAY2}>
            {LeftButton}
          </Text>
        ) : (
          <LeftButton />
        )}
      </TouchableOpacity>
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
