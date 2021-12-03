import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';

import { image } from 'assets/svg/icons';
import { GRAY3, GRAY4 } from 'theme/Colors';
import { ReqMakeSpace } from 'types/Request';

import SvgIcon from 'components/SvgIcon';
import LineTextInput from 'components/LineTextInput';
import ProfileImage from 'components/ProfileImage';

interface Props {
  setSpaceInput: React.Dispatch<React.SetStateAction<ReqMakeSpace>>;
  spaceInput: ReqMakeSpace;
}

const Step1 = ({ setSpaceInput, spaceInput }: Props) => {
  const onChangeText = (text: string, name: string) => {
    setSpaceInput({
      ...spaceInput,
      [name]: text,
    });
  };

  const onChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
      if (response && response.assets) {
        setSpaceInput({
          ...spaceInput,
          image: {
            uri: response.assets[0].uri!,
            type: response.assets[0].type!,
            name: response.assets[0].fileName!,
          },
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} style={{ paddingTop: 20, alignItems: 'center' }}>
        <TouchableOpacity style={styles.circle} onPress={onChoosePhoto}>
          {spaceInput.image ? (
            <ProfileImage uri={spaceInput.image.uri} />
          ) : (
            <SvgIcon xml={image} fill={GRAY3} width={24} disabled />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.paddingWidth}>
        <LineTextInput
          style={{ textAlign: 'center' }}
          fontType={'BOLD_18'}
          placeholder={'이름'}
          limit={20}
          maxLength={20}
          name={'name'}
          onChangeText={onChangeText}
          defaultValue={spaceInput.name}
        />
      </View>
      <View style={styles.paddingWidth}>
        <LineTextInput
          multiline
          placeholder={'소개를 입력해주세요'}
          limit={60}
          maxLength={60}
          title={'description'}
          name={'description'}
          onChangeText={onChangeText}
          blurOnSubmit
          defaultValue={spaceInput.description}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  paddingWidth: {
    paddingTop: 40,
    width: '100%',
  },
  circle: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY4,
    borderRadius: 100,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryItem: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderColor: GRAY3,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default Step1;
