import React from 'react';
import { StyleSheet, View } from 'react-native';

import { barMenu } from 'assets/svg/icons';
import { HeaderListItemType } from 'types';
import { BLACK, GRAY2, LINE, WHITE } from 'theme/Colors';
import { normalize } from 'utils';
import SvgIcon from 'components/SvgIcon';
import ProfileImage from 'components/ProfileImage';
import Text from 'components/Text';
import { useDispatch } from 'react-redux';
import { toggleSideMenu } from 'store/slices/sideMenu';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SelectorProps {
  data: HeaderListItemType;
  leftButton?: {
    xml: string;
    onPress: () => void;
  };
}

const HeaderCurrent = ({ data, leftButton }: SelectorProps) => {
  const dispatch = useDispatch();

  return (
    <View style={[styles.spaceItem, { justifyContent: 'space-between' }]}>
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.flexRowCenter}
        onPress={() => dispatch(toggleSideMenu())}>
        <SvgIcon
          disabled
          xml={barMenu}
          fill={GRAY2}
          width={normalize(20)}
          style={{ marginRight: 10 }}
        />
        {!!data.imageUrl && (
          <ProfileImage uri={data.imageUrl} width={24} style={{ marginRight: 8 }} />
        )}
        <Text fontType={'BOLD_18'}>{data.name}</Text>
      </TouchableOpacity>
      {leftButton && <SvgIcon xml={leftButton.xml} fill={BLACK} onPress={leftButton.onPress} />}
    </View>
  );
};

const styles = StyleSheet.create({
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomColor: LINE,
    borderBottomWidth: 1,
  },
  fadingText: {
    fontSize: 28,
  },
});

export default HeaderCurrent;
