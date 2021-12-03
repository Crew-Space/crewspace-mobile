import React from 'react';
import { StyleSheet, TextProps } from 'react-native';

import Text from 'components/Text';
import { GRAY1 } from 'theme/Colors';

const LinkButton = ({ children, style, ...restProps }: TextProps) => {
  return (
    <Text fontType={'REGULAR_14'} style={[styles.subText, style]} {...restProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  subText: { color: GRAY1, marginTop: 8, textDecorationLine: 'underline' },
});

export default LinkButton;
