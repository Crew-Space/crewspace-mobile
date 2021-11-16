import React from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';

import { FONT, Typo, TypoType, scaleFont } from 'theme/Typography';
import { BLACK } from 'theme/Colors';

interface TextProps extends RNTextProps {
  fontType?: TypoType;
  paragraph?: boolean;
}

const textStyles = (typo: TypoType = 'REGULAR_16', paragraph = false) => ({
  fontFamily: FONT[Typo[typo].weight],
  fontSize: scaleFont(Typo[typo].size),
  ...(paragraph && { lineHeight: scaleFont(Typo[typo].size) * 1.5 }),
});

const Text = ({ children, style, fontType, paragraph, ...restProps }: TextProps) => {
  return (
    <RNText style={[styles.base, style, textStyles(fontType, paragraph)]} {...restProps}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: BLACK,
  },
});

export default Text;
