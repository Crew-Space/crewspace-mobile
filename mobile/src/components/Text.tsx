import React from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps, View } from 'react-native';

import { TypoProps, textStyles } from 'theme/Typography';
import { BLACK } from 'theme/Colors';

type Props = TypoProps & RNTextProps;

const Text = ({ children, style, color, fontType, paragraph, ...restProps }: Props) => {
  return (
    <View>
      <RNText
        style={[textStyles(fontType, paragraph), styles.base, style, { ...(color && { color }) }]}
        {...restProps}>
        {children}
      </RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    color: BLACK,
  },
});

export default Text;
