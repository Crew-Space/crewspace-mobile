import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';
import { GRAY3 } from 'theme/Colors';
import TextInput from './TextInput';

interface Props {
  defaultValue: string;
}

const BirthdayInput = ({ defaultValue }: Props) => {
  const [year, month, day] = defaultValue?.split('.');

  return (
    <View style={styles.container}>
      <TextInput defaultValue={year} keyboardType={'number-pad'} />
      <Text color={GRAY3}> . </Text>
      <TextInput defaultValue={month} keyboardType={'number-pad'} />
      <Text color={GRAY3}> . </Text>
      <TextInput defaultValue={day} keyboardType={'number-pad'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
});

export default BirthdayInput;
