import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { expendMore } from 'assets/svg/icons';
import { SpaceType } from 'types';
import { BLACK, WHITE } from 'theme/Colors';
import { normalize } from 'utils';
import SvgIcon from 'components/SvgIcon';
import ProfileImage from 'components/ProfileImage';
import Text from 'components/Text';

interface SelectorProps {
  spaces: SpaceType[];
  leftButton?: {
    xml: string;
    onPress: () => void;
  };
}

const HeaderSelector = ({ spaces, leftButton }: SelectorProps) => {
  const [expended, setExpended] = useState<boolean>(false);

  return (
    <View
      style={[styles.spaceItem, { justifyContent: 'space-between' }]}
      onTouchEnd={() => setExpended(!expended)}>
      <View style={styles.flexRowCenter}>
        <ProfileImage
          uri={'https://blog.kakaocdn.net/dn/IKDPO/btqU3oZ8nv9/3nkhB9jPjfUEwCMI6ywIk1/img.jpg'}
          width={24}
          style={{ marginRight: 8 }}
        />
        <Text fontType={'BOLD_18'}>{spaces[0].name}</Text>
        <SvgIcon disabled xml={expendMore} fill={BLACK} width={normalize(20)} />
      </View>
      {leftButton && <SvgIcon xml={leftButton.xml} fill={BLACK} onPress={leftButton.onPress} />}
    </View>
  );
};

const styles = StyleSheet.create({
  flexRowCenter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  spaceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  fadingText: {
    fontSize: 28,
  },
});

export default HeaderSelector;
