import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { BLACK } from 'theme/Colors';

interface Props extends TouchableOpacityProps {
  xml: string;
  width?: number;
  fill?: string;
}

const SvgIcon = ({ width = 24, xml, fill = BLACK, style, ...restProps }: Props) => {
  return (
    <TouchableOpacity {...restProps} style={[styles.container, style]}>
      <SvgXml xml={xml} width={width} fill={fill} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SvgIcon;
