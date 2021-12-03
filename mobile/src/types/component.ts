import { SwitchProps, TextInputProps as RNTextInputProps } from 'react-native';
import { TypoProps, TypoType } from 'theme/Typography';
import { CategoryType } from 'types';

export type TextInputProps = TypoProps &
  Omit<RNTextInputProps, 'onChangeText' | 'onBlur'> & {
    name: string;
    onChangeText?: (text: string, name: string) => void;
    onBlur?: (name: string) => void;
  };

export type IdOptionalCategory = Omit<CategoryType, 'id'> & {
  id?: number;
};

export type ItemType = {
  text: string;
  fontType?: TypoType;
  onTouch?: {
    onPress: () => void;
  };
  toggle?: SwitchProps;
};
