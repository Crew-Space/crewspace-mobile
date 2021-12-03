import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { ResMember } from 'types/Response';
import { PROFILE_TEXT } from 'constant';
import { GRAY1, GRAY2, LINE } from 'theme/Colors';
import { normalize } from 'utils';
import Text from 'components/Text';
import { TextInput } from 'components/TextInput';

interface Props extends ViewProps {
  name: keyof ResMember;
  contents?: string;
  editable?: boolean;
  onChangeText?: (text: string, name: string) => void;
}

const TitleDescribe = ({ children, name, contents, editable, onChangeText }: Props) => (
  <View style={styles.container}>
    <View style={{ width: normalize(70) }}>
      <Text fontType={'REGULAR_14'} color={GRAY2}>
        {PROFILE_TEXT[name]}
      </Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {children ?? (
        <>
          {name === 'sns' && <Text color={GRAY1}>@ </Text>}
          <TextInput
            defaultValue={contents}
            multiline
            blurOnSubmit
            style={{ paddingTop: 0 }}
            name={name}
            editable={editable}
            onChangeText={onChangeText}
          />
        </>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomColor: LINE,
    borderBottomWidth: 1,
    width: '100%',
  },
});

export default TitleDescribe;
