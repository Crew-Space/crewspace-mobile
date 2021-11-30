import React from 'react';
import { StyleSheet, SwitchProps, View, ViewStyle } from 'react-native';

import Text from 'components/Text';
import { GRAY2, LINE, WHITE } from 'theme/Colors';
import { TypoType } from 'theme/Typography';
import { SvgXml } from 'react-native-svg';
import { expandMore } from 'assets/svg/icons';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';

export type ItemType = {
  text: string;
  fontType?: TypoType;
  onTouch?: {
    onPress: () => void;
  };
  toggle?: SwitchProps;
};

interface Prop {
  sectionTitle?: string;
  data: ItemType[];
  containerStyle?: ViewStyle;
}

const SectionList = ({ sectionTitle, data, containerStyle }: Prop) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {sectionTitle && (
        <View style={[styles.item]}>
          <Text fontType={'BOLD_16'}>{sectionTitle}</Text>
        </View>
      )}
      {data.map((item) => (
        <>
          {item.toggle ? (
            <View style={styles.item}>
              <Text fontType={item.fontType}>{item.text}</Text>
              <Switch {...item.toggle} />
            </View>
          ) : (
            <TouchableOpacity style={styles.item}>
              <Text fontType={item.fontType}>{item.text}</Text>
              <SvgXml xml={expandMore.right} width={20} fill={GRAY2} />
            </TouchableOpacity>
          )}
        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 20,
    borderBottomColor: LINE,
    borderBottomWidth: 1,
    backgroundColor: WHITE,
  },
});

export default SectionList;
