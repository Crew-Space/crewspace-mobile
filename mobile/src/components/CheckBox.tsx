import { checkBox } from 'assets/svg/icons';
import React from 'react';
import { BLACK, GRAY2 } from 'theme/Colors';
import SvgIcon from './SvgIcon';

interface Props {
  isChecked: boolean;
  width?: number;
  fill?: string;
  onPress?: () => void;
}

const CheckBox = ({ isChecked, width = 24, fill = BLACK, onPress }: Props) => {
  return (
    <SvgIcon
      onPress={onPress}
      xml={isChecked ? checkBox.on : checkBox.off}
      fill={isChecked ? fill : GRAY2}
      width={width}
    />
  );
};

export default CheckBox;
