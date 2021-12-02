import { TouchableOpacityProps } from 'react-native';
import { Space } from 'types';

export interface MenuItemProps extends TouchableOpacityProps {
  space: Space;
  isActive?: boolean;
}
