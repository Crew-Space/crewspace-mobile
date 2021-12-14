import confetti from 'assets/svg/confetti';
import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { WHITE } from 'theme/Colors';
import Text from './Text';

const NoneList = () => {
  return (
    <View
      style={{
        flexGrow: 1,
        height: '100%',
        backgroundColor: WHITE,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <SvgXml xml={confetti} />
      </View>
      <Text fontType={'BOLD_18'} style={{ textAlign: 'center' }}>
        앗, 이런!{'\n'}리스트가 비어있어요!
      </Text>
    </View>
  );
};

export default NoneList;
