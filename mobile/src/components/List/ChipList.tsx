import Text from 'components/Text';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GRAY1, GRAY3, PRIMARY } from 'theme/Colors';

interface Props {
  defaultValue?: boolean[];
  data: string[];
  onValueChange: (value: boolean[]) => void;
  onlyOneSelected?: boolean;
}

const ChipList = ({ defaultValue, data, onValueChange, onlyOneSelected = false }: Props) => {
  const [selected, setSelected] = useState(
    defaultValue && !defaultValue.length ? defaultValue : data.map((_) => false),
  );

  const onTouchEnd = (index: number) => {
    const newState = (onlyOneSelected ? data.map((_) => false) : selected).map((d, idx) =>
      index === idx ? !d : d,
    );
    onValueChange(newState);
    setSelected(newState);
  };

  return (
    <View style={styles.list}>
      {data.map((chip, index) => (
        <View
          key={index}
          style={[
            styles.categoryItem,
            {
              borderColor: selected[index] ? PRIMARY : GRAY3,
            },
          ]}
          onTouchEnd={() => onTouchEnd(index)}>
          <Text fontType={'REGULAR_14'} color={selected[index] ? PRIMARY : GRAY1}>
            {chip}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryItem: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
  },
});
export default ChipList;
