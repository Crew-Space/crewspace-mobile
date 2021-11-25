import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';
import { GRAY3 } from 'theme/Colors';
import TextInput, { TextInputProps } from './TextInput';

type Props = TextInputProps & {
  defaultValue?: string;
};

const BirthdayInput = ({ defaultValue, onChangeText }: Props) => {
  const birthday = defaultValue?.split('.');
  const [year, month, day] = [useRef(''), useRef(''), useRef('')];

  const onChangeBirthdayText = (text: string, name: string) => {
    if (name === 'birthday.year') {
      year.current = text;
    } else if (name === 'birthday.month') {
      month.current = text;
    } else if (name === 'birthday.day') {
      day.current = text;
    }
    onChangeText && onChangeText(`${year.current}.${month.current}.${day.current}`, 'birthday');
  };

  return (
    <View style={styles.container}>
      <TextInput
        defaultValue={birthday && birthday[0]}
        keyboardType={'number-pad'}
        placeholder={'----'}
        maxLength={4}
        name={'birthday.year'}
        onChangeText={onChangeBirthdayText}
      />
      <Text color={GRAY3}> . </Text>
      <TextInput
        defaultValue={birthday && birthday[1]}
        keyboardType={'number-pad'}
        placeholder={'--'}
        maxLength={2}
        name={'birthday.month'}
        onChangeText={onChangeBirthdayText}
      />
      <Text color={GRAY3}> . </Text>
      <TextInput
        defaultValue={birthday && birthday[2]}
        keyboardType={'number-pad'}
        placeholder={'--'}
        maxLength={2}
        name={'birthday.day'}
        onChangeText={onChangeBirthdayText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
});

export default BirthdayInput;
