import React from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';

import { FONT, FONT_SIZE, FONT_WEIGHT, LINE_HEIGHT, scaleFont } from 'theme/Typography';
import { BLACK } from 'theme/Colors';

interface TextProps extends RNTextProps {
  fontType?: FontType;
}

type FontType = {
  size: FONT_SIZE;
  weight: FONT_WEIGHT;
  lineHeight: LINE_HEIGHT;
};

const textStyles = (fontType: FontType = { size: 16, weight: 'R', lineHeight: 24 }) => ({
  fontFamily: FONT[fontType.weight],
  fontSize: scaleFont(fontType.size),
  lineHeight: scaleFont(fontType.lineHeight),
});

const Paragraph = ({ children, style, fontType, ...restProps }: TextProps) => {
  return (
    <RNText style={[styles.base, style, textStyles(fontType)]} {...restProps}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: BLACK,
  },
});

export default Paragraph;
