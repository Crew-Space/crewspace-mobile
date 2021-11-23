import React from 'react';
import { StyleSheet, Text as RNText, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { TypoProps, textStyles } from 'theme/Typography';
import { BLACK } from 'theme/Colors';

type Props = TypoProps & TouchableOpacityProps;

const TouchableText = ({ children, style, color, fontType, paragraph, ...restProps }: Props) => {
  return (
    <TouchableOpacity {...restProps}>
      <RNText
        style={[textStyles(fontType, paragraph), styles.base, style, { ...(color && { color }) }]}>
        {children}
      </RNText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    color: BLACK,
  },
});

export default TouchableText;
