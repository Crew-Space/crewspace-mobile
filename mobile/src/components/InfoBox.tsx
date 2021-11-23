import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import Text from 'components/Text';
import { PRIMARY, PRIMARY_LIGHT, RED, RED_LIGHT } from 'theme/Colors';
import SvgIcon from './SvgIcon';
import { info } from 'assets/svg/icons';

type InfoBoxType = {
  color: string;
  backgroundColor: string;
};

interface Props extends ViewProps {
  boxType: keyof typeof infoBoxTypes;
  text: string;
}

const infoBoxTypes: { [key: string]: InfoBoxType } = {
  warning: {
    color: PRIMARY,
    backgroundColor: PRIMARY_LIGHT,
  },
  error: {
    color: RED,
    backgroundColor: RED_LIGHT,
  },
};

const InfoBox = ({ boxType: blockType, text, style, ...restProps }: Props) => {
  return (
    <View
      {...restProps}
      style={[
        styles.container,
        { backgroundColor: infoBoxTypes[blockType].backgroundColor },
        style,
      ]}>
      <SvgIcon
        xml={info}
        width={16}
        fill={infoBoxTypes[blockType].color}
        style={{ marginRight: 4 }}
      />
      <Text fontType={'REGULAR_14'} color={infoBoxTypes[blockType].color}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
});

export default InfoBox;
