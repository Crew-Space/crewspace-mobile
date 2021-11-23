import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

import { textStyles, TypoProps } from 'theme/Typography';
import { BLACK } from 'theme/Colors';

type Props = TypoProps & RNTextInputProps;

const CountTextInput = ({ style, color, fontType, paragraph, ...restProps }: Props) => {
  const [inputText, setInputText] = useState<string>();

  return (
    <View>
      <RNTextInput
        {...restProps}
        style={[textStyles(fontType, paragraph), styles.base, style, { ...(color && { color }) }]}
        onChangeText={setInputText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    color: BLACK,
  },
});

export default CountTextInput;
