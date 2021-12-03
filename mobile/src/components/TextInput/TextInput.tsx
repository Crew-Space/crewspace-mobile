import React from 'react';
import { StyleSheet, TextInput as RNTextInput, View } from 'react-native';

import { textStyles } from 'theme/Typography';
import { BLACK } from 'theme/Colors';
import { TextInputProps } from 'types/component';

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
