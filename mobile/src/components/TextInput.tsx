import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

import { FONT, Typo, TypoType, scaleFont } from 'theme/Typography';
import { BLACK } from 'theme/Colors';

interface TextProps extends RNTextInputProps {
  fontType?: TypoType;
  paragraph?: boolean;
  color?: string;
}

const textStyles = (typo: TypoType = 'REGULAR_16', paragraph = false) => ({
  fontFamily: FONT[Typo[typo].weight],
  fontSize: scaleFont(Typo[typo].size),
  ...(paragraph && { lineHeight: scaleFont(Typo[typo].size) * 1.5 }),
});

const TextInput = React.forwardRef(
  ({ style, color, fontType, paragraph, ...restProps }: TextProps) => {
    return (
      <View>
        <RNTextInput
          style={[textStyles(fontType, paragraph), styles.base, style, { ...(color && { color }) }]}
          {...restProps}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  base: {
    color: BLACK,
  },
});

export default TextInput;
