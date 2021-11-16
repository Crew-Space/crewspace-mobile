import React from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';

import { FONT, Typo, TypoType, scaleFont } from 'theme/Typography';
import { BLACK } from 'theme/Colors';

interface TextProps extends RNTextProps {
  fontType?: TypoType;
  isParagraph?: boolean;
}

const textStyles = (typo: TypoType = 'REGULAR_16', isParagraph = false) => ({
  fontFamily: FONT[Typo[typo].weight],
  fontSize: scaleFont(Typo[typo].size),
  ...(isParagraph && { isParagraph: scaleFont(Typo[typo].size) * 1.5 }),
});

const Text = ({ children, style, fontType, isParagraph, ...restProps }: TextProps) => {
  return (
    <RNText style={[styles.base, style, textStyles(fontType, isParagraph)]} {...restProps}>
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
