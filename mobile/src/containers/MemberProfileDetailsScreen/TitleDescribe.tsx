import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { MemberProfile } from 'types';
import { PROFILE_TEXT } from 'constant';
import { GRAY1, GRAY2, LINE } from 'theme/Colors';
import { normalize } from 'utils';
import Text from 'components/Text';
import TextInput from 'components/TextInput';

interface Props extends ViewProps {
  name: keyof MemberProfile;
  contents?: string;
}

const TitleDescribe = ({ children, name, contents }: Props) => (
  <View style={styles.container}>
    <View style={{ width: normalize(70) }}>
      <TextInput fontType={'REGULAR_14'} color={GRAY2}>
        {PROFILE_TEXT[name]}
      </TextInput>
    </View>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {children ?? (
        <>
          {name === 'sns' && <Text color={GRAY1}>@ </Text>}
          <TextInput defaultValue={contents} multiline blurOnSubmit style={{ paddingTop: 0 }} />
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
