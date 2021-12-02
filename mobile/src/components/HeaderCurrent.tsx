import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { expandMore } from 'assets/svg/icons';
import { HeaderListItemType } from 'types';
import { BLACK, LINE, WHITE } from 'theme/Colors';
import { normalize } from 'utils';
import SvgIcon from 'components/SvgIcon';
import ProfileImage from 'components/ProfileImage';
import Text from 'components/Text';

interface SelectorProps {
  data: HeaderListItemType;
  leftButton?: {
    xml: string;
    onPress: () => void;
  };
}

const HeaderCurrent = ({ data, leftButton }: SelectorProps) => {
  const [expended, setExpended] = useState<boolean>(false);

  return (
    <View
      style={[styles.spaceItem, { justifyContent: 'space-between' }]}
      onTouchEnd={() => setExpended(!expended)}>
      <View style={styles.flexRowCenter}>
        {!!data.imageUrl && (
          <ProfileImage uri={data.imageUrl} width={24} style={{ marginRight: 8 }} />
        )}
        <Text fontType={'BOLD_18'}>{data.name}</Text>
        <SvgIcon xml={expandMore.down} fill={BLACK} width={normalize(20)} />
      </View>
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
