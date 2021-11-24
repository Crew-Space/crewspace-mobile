import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

import { textStyles, TypoProps } from 'theme/Typography';
import { BLACK, GRAY2, LINE } from 'theme/Colors';
import Text from 'components/Text';

type OwnProps = {
  title?: string;
  name?: string;
  limit?: number;
};
type Props = TypoProps & RNTextInputProps & OwnProps;

const LineTextInput = ({
  style,
  color,
  fontType,
  paragraph,
  limit,
  title,
  ...restProps
}: Props) => {
  const [inputText, setInputText] = useState<string>();

  return (
    <View>
      {title && (
        <View style={styles.title}>
          <Text fontType={'REGULAR_12'} color={GRAY2}>
            {title}
          </Text>
        </View>
      )}
      <View style={styles.input}>
        <RNTextInput
          {...restProps}
          style={[textStyles(fontType, paragraph), styles.base, style, { ...(color && { color }) }]}
          onChangeText={setInputText}
        />
      </View>
      {limit && (
        <View style={styles.count}>
          <Text fontType={'REGULAR_12'} color={GRAY2}>
            {inputText?.length || 0}/{limit}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    color: BLACK,
    width: '100%',
  },
  title: {
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    paddingVertical: 8,
    borderBottomColor: LINE,
    borderBottomWidth: 1,
  },
  count: {
    alignSelf: 'flex-end',
  },
});

export default LineTextInput;
