import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/core';

import { LINE, WHITE } from 'theme/Colors';
import { PostScreenPropsType } from 'types/Route';
import TextInput from 'components/TextInput';
import SvgIcon from 'components/SvgIcon';
import { attachFile, image, settings } from 'assets/svg/icons';
import { setDescription } from 'store/slices/newPost';

const PostScreen = () => {
  const dispatch = useDispatch();
  const { params } = useRoute<PostScreenPropsType>();

  const onChangeText = (text: string, name: string) => {
    if (name === 'description') {
      dispatch(setDescription(text));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
      <View style={styles.input}>
        {params.postingType === 'notice' && (
          <View style={styles.inputTitle}>
            <TextInput fontType={'BOLD_20'} placeholder={'제목'} name={'title'} />
          </View>
        )}
        <View style={styles.inputContents}>
          <TextInput
            placeholder={'터치하여 내용을 입력해 주세요'}
            multiline
            name={'description'}
            onChangeText={onChangeText}
          />
        </View>
      </View>
      <View style={styles.bottomTab}>
        <SvgIcon xml={image} />
        {params.postingType === 'notice' && (
          <>
            <SvgIcon xml={attachFile} />
            <SvgIcon xml={settings.off} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: WHITE,
  },
  input: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  inputTitle: {
    borderBottomColor: LINE,
    borderBottomWidth: 1,
    paddingTop: 18,
    paddingBottom: 10,
    marginBottom: 30,
  },
  inputContents: {
    flex: 1,
  },
  bottomTab: {
    paddingTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopColor: LINE,
    borderTopWidth: 1,
  },
});

export default PostScreen;
