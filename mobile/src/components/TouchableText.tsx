import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { TypoType } from 'theme/Typography';
import Text from 'components/Text';

type PropsType = TouchableOpacityProps & typeof Text;
interface TextProps extends PropsType {
  fontType?: TypoType;
  paragraph?: boolean;
  color?: string;
}

const TouchableText = ({ children, fontType, paragraph, color, ...restProps }: TextProps) => {
  return (
    <TouchableOpacity {...restProps}>
      <Text fontType={fontType} paragraph={paragraph} color={color}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default TouchableText;
