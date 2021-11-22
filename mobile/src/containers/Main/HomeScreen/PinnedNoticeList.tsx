import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { BACKGROUND } from 'theme/Colors';
import { PinnedNoticeHeaderProps } from 'types';
import PinnedNotice from './PinnedNotice';

interface Props {
  data: PinnedNoticeHeaderProps[];
}

const PinnedNoticeList = ({ data }: Props) => {
  return (
    <FlatList
      horizontal
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={({ item }) => <PinnedNotice header={item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: BACKGROUND,
  },
  contentContainer: {
    paddingVertical: 17,
    paddingHorizontal: 15,
    backgroundColor: BACKGROUND,
  },
});

export default PinnedNoticeList;
