import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Text from 'components/Text';
import { crewOnSpace } from 'assets/svg/spacers';

const CrewOnError = ({ text = '데이터를 가져오는 데 실패했어요' }: { text?: string }) => {
  return (
    <View style={[styles.container]}>
      <SvgXml xml={crewOnSpace} width={160} />
      <Text fontType={'BOLD_20'}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default CrewOnError;
