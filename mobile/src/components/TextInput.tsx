import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

import { TypoProps, textStyles } from 'theme/Typography';
import { BLACK } from 'theme/Colors';

type Props = TypoProps & RNTextInputProps;

const TextInput = ({ style, color, fontType, paragraph, ...restProps }: Props) => {
  return (
    <View>
      <RNTextInput
        style={[textStyles(fontType, paragraph), styles.base, style, { ...(color && { color }) }]}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    color: BLACK,
  },
});

export default TextInput;
