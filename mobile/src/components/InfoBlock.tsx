import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';
import { PRIMARY, PRIMARY_LIGHT, RED, RED_LIGHT } from 'theme/Colors';
import SvgIcon from './SvgIcon';
import { info } from 'assets/svg/icons';

type InfoBlockType = {
  color: string;
  backgroundColor: string;
};

interface Props {
  blockType: keyof typeof infoBlockTypes;
  text: string;
}

const infoBlockTypes: { [key: string]: InfoBlockType } = {
  warning: {
    color: PRIMARY,
    backgroundColor: PRIMARY_LIGHT,
  },
  error: {
    color: RED,
    backgroundColor: RED_LIGHT,
  },
};

const InfoBlock = ({ blockType, text }: Props) => {
  return (
    <View
      style={[styles.container, { backgroundColor: infoBlockTypes[blockType].backgroundColor }]}>
      <SvgIcon xml={info} width={16} fill={infoBlockTypes[blockType].color} />
      <Text fontType={'REGULAR_14'} color={infoBlockTypes[blockType].color}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
});

export default InfoBlock;
