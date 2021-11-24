import React from 'react';
import { StyleSheet, TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native';

import Text from 'components/Text';
import { WHITE, PRIMARY } from 'theme/Colors';

const Button = ({ children, style, ...restProps }: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      style={[buttonStyles.mainButton.button, style]}
      {...restProps}
      activeOpacity={0.7}>
      <Text fontType={'BOLD_16'} style={[buttonStyles.mainButton.text]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 8,
    backgroundColor: PRIMARY,
  },
  mainButtonText: {
    color: WHITE,
  },
});

const buttonStyles = {
  mainButton: {
    button: styles.mainButton,
    text: styles.mainButtonText,
  },
};

export default Button;
