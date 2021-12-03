import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';
import { GRAY3 } from 'theme/Colors';
import { TextInput } from 'components/TextInput';
import { TextInputProps } from 'types/component';

type Props = TextInputProps & {
  defaultValue?: string;
};

const BirthdayInput = ({ defaultValue, onChangeText, ...restProps }: Props) => {
  const birthday = defaultValue?.split('/');
  const [year, month, day] = [useRef(''), useRef(''), useRef('')];

  const onChangeBirthdayText = (text: string, name: string) => {
    if (name === 'birthday.year') {
      year.current = text;
    } else if (name === 'birthday.month') {
      month.current = text;
    } else if (name === 'birthday.day') {
      day.current = text;
    }
    onChangeText && onChangeText(`${year.current}/${month.current}/${day.current}`, 'birthdate');
  };

  return (
    <View style={styles.container}>
      <TextInput
        {...restProps}
        defaultValue={birthday && birthday[0]}
        keyboardType={'number-pad'}
        placeholder={'----'}
        maxLength={4}
        name={'birthday.year'}
        onChangeText={onChangeBirthdayText}
      />
      <Text color={GRAY3}> . </Text>
      <TextInput
        {...restProps}
        defaultValue={birthday && birthday[1]}
        keyboardType={'number-pad'}
        placeholder={'--'}
        maxLength={2}
        name={'birthday.month'}
        onChangeText={onChangeBirthdayText}
      />
      <Text color={GRAY3}> . </Text>
      <TextInput
        {...restProps}
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
