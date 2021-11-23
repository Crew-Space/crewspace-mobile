import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import Text from 'components/Text';
import { LINE, WHITE } from 'theme/Colors';

interface Props extends ViewProps {
  text: string;
}

const SectionHeader = ({ children, text, style, ...restProps }: Props) => {
  return (
    <View {...restProps} style={[styles.container, style]}>
      <Text fontType={'BOLD_18'}>{text}</Text>
      {children}
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
