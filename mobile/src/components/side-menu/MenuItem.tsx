import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { MenuItemProps } from './types';
import { PRIMARY, PRIMARY_EXTRA_LIGHT } from 'theme/Colors';
import ProfileImage from 'components/ProfileImage';
import Text from 'components/Text';

const MenuItem = ({ space, isActive, ...restProps }: MenuItemProps) => {
  return (
    <TouchableOpacity
      {...restProps}
      style={[styles.container, { ...(isActive && { backgroundColor: PRIMARY_EXTRA_LIGHT }) }]}>
      <ProfileImage uri={space.spaceImage} width={24} />
      <Text fontType={'BOLD_18'} style={{ marginLeft: 8 }} {...(isActive && { color: PRIMARY })}>
        {space.spaceName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 19,
    paddingHorizontal: 20,
  },
});

export default MenuItem;
