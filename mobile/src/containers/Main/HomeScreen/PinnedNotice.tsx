import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { pin } from 'assets/svg/icons';
import { LINE, PRIMARY, WHITE } from 'theme/Colors';
import { PinnedNoticeProps } from 'types';
import { RootRouterParams } from 'types/Route';
import { normalize } from 'utils';
import Text from 'components/Text';
import PostHeader from 'components/PostHeader';
import { useUnfixNoticeMutation } from 'store/services/post';

const PinnedNotice = ({ header }: PinnedNoticeProps) => {
  const navigation = useNavigation<RootRouterParams>();
  const [unfixPost] = useUnfixNoticeMutation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ padding: 18, borderBottomColor: LINE, borderBottomWidth: 1 }}
        onPress={() =>
          navigation.navigate('PostDetails', {
            postType: 'notice',
            postId: header.postId,
          })
        }>
        <PostHeader {...header} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fixbutton}
        onPress={() => {
          unfixPost(header.postId);
        }}>
        <SvgXml xml={pin.on} fill={PRIMARY} width={20} style={{ marginRight: 3 }} />
        <Text fontType={'REGULAR_14'} color={PRIMARY}>
          고정
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: normalize(280),
    maxWidth: 300,
    backgroundColor: WHITE,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  fixbutton: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PinnedNotice;
