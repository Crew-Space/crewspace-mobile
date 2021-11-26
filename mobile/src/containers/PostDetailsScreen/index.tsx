import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/core';

import { WHITE } from 'theme/Colors';
import Text from 'components/Text';
import { PostDetailsScreenPropsType } from 'types/Route';

const PostDetailsScreen = () => {
  const { params } = useRoute<PostDetailsScreenPropsType>();

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Text fontType={'REGULAR_16'}>{params.postId}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default PostDetailsScreen;
