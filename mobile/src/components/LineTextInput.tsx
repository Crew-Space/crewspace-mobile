import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BLACK, GRAY1, GRAY2, LINE } from 'theme/Colors';
import Text from 'components/Text';
import { MemberProfile } from 'types';
import { PROFILE_TEXT } from 'constant';
import BirthdayInput from './BirthdayInput';
import TextInput, { TextInputProps } from './TextInput';

type OwnProps = {
  title?: keyof MemberProfile;
  name?: string;
  limit?: number;
};
type Props = TextInputProps & OwnProps;

const LineTextInput = ({ style, limit, title, name, onChangeText, ...restProps }: Props) => {
  const [inputText, setInputText] = useState<string>();

  return (
    <View>
      {title && (
        <View style={styles.title}>
          <Text fontType={'REGULAR_12'} color={GRAY2}>
            {PROFILE_TEXT[title]}
          </Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {title === 'sns' && <Text color={GRAY1}>@ </Text>}
        <View style={styles.input}>
          {title === 'birthdate' ? (
            <BirthdayInput {...restProps} name={name} onChangeText={onChangeText} />
          ) : (
            <TextInput
              {...restProps}
              style={[style]}
              name={name}
              onChangeText={(text) => {
                onChangeText && onChangeText(text, name);
                setInputText(text);
              }}
            />
          )}
        </View>
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
