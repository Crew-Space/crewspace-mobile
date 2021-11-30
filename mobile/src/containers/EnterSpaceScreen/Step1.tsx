import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { GRAY1, GRAY2, GRAY3, GRAY4, PRIMARY } from 'theme/Colors';
import Text from 'components/Text';
import SvgIcon from 'components/SvgIcon';
import { image } from 'assets/svg/icons';
import LineTextInput from 'components/LineTextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ReqSpaceEnter } from 'types/Request';
import { launchImageLibrary } from 'react-native-image-picker';
import ProfileImage from 'components/ProfileImage';

type MemberCategory = {
  categoryId: number;
  categoryName: string;
};

interface Props {
  memberCategories: MemberCategory[];
  setUserInfo: React.Dispatch<React.SetStateAction<ReqSpaceEnter>>;
  userInfo: ReqSpaceEnter;
}

const Step1 = ({ memberCategories, setUserInfo, userInfo }: Props) => {
  const onChangeText = (text: string, name: string) => {
    setUserInfo({
      ...userInfo,
      [name]: text,
    });
  };

  const onChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
      if (response && response.assets) {
        setUserInfo({
          ...userInfo,
          image: {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          },
        });
      }
    });
  };

  return (
    <>
      <TouchableOpacity activeOpacity={0.6} style={{ paddingTop: 20, alignItems: 'center' }}>
        <TouchableOpacity style={styles.circle} onPress={onChoosePhoto}>
          {userInfo.image ? (
            <ProfileImage uri={userInfo.image.uri} />
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
          defaultValue={userInfo.name}
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
          defaultValue={userInfo.description}
        />
      </View>
      <View style={styles.paddingWidth}>
        <Text fontType={'REGULAR_12'} color={GRAY2}>
          회원분류
        </Text>
        <View style={styles.categoryList}>
          {memberCategories.map((category) => (
            <View
              key={category.categoryId}
              style={[
                styles.categoryItem,
                {
                  ...(userInfo.memberCategoryId === category.categoryId && {
                    borderColor: PRIMARY,
                  }),
                },
              ]}
              onTouchEnd={() =>
                setUserInfo({
                  ...userInfo,
                  memberCategoryId: category.categoryId,
                })
              }>
              <Text
                fontType={'REGULAR_14'}
                color={userInfo.memberCategoryId === category.categoryId ? PRIMARY : GRAY1}>
                {category.categoryName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
