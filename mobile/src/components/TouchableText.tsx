import React from 'react';
import { StyleSheet, Text as RNText, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { FONT, Typo, TypoType, scaleFont } from 'theme/Typography';
import { BLACK } from 'theme/Colors';

interface TextProps extends TouchableOpacityProps {
  fontType?: TypoType;
  paragraph?: boolean;
  color?: string;
}

const textStyles = (typo: TypoType = 'REGULAR_16', paragraph = false) => ({
  fontFamily: FONT[Typo[typo].weight],
  fontSize: scaleFont(Typo[typo].size),
  ...(paragraph && { lineHeight: scaleFont(Typo[typo].size) * 1.5 }),
});

const TouchableText = ({
  children,
  style,
  color,
  fontType,
  paragraph,
  ...restProps
}: TextProps) => {
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
