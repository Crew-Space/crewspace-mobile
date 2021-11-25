import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

import { TypoProps, textStyles } from 'theme/Typography';
import { BLACK } from 'theme/Colors';

export type TextInputProps = TypoProps &
  Omit<RNTextInputProps, 'onChangeText' | 'onBlur'> & {
    name: string;
    onChangeText?: (text: string, name: string) => void;
    onBlur?: (name: string) => void;
  };

const TextInput = ({
  style,
  color,
  fontType,
  paragraph,
  name,
  onChangeText,
  onBlur,
  ...restProps
}: TextInputProps) => {
  return (
    <View>
      <RNTextInput
        {...restProps}
        style={[textStyles(fontType, paragraph), styles.base, style, { ...(color && { color }) }]}
        onChangeText={(text) => onChangeText && onChangeText(text, name)}
        onBlur={() => onBlur && onBlur(name)}
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
