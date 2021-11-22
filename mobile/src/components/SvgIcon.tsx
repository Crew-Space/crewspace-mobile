import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { BLACK } from 'theme/Colors';

interface Props extends TouchableOpacityProps {
  xml: string;
  width?: number;
  fill?: string;
}

const SvgIcon = ({ width = 24, xml, fill = BLACK, ...restProps }: Props) => {
  return (
    <TouchableOpacity {...restProps}>
      <SvgXml xml={xml} width={width} fill={fill} />
    </TouchableOpacity>
  );
};

export default SvgIcon;
