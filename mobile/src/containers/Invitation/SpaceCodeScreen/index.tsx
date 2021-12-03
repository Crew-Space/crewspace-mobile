import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

import { INITIAL_INVITATION_CODE, NUM_OF_INVITATION_CODE } from 'constant';
import { scaleFont } from 'theme/Typography';
import { BLACK, GRAY1, GRAY2, GRAY4, RED, WHITE } from 'theme/Colors';
import { InvitationParams } from 'types/Route';
import { useCheckInvitationQuery } from 'store/services/space';

import { LinkButton } from 'components/Button';
import Text from 'components/Text';
import { setNewSpace } from 'store/slices/space';

const CodeText = ({ char }: { char: string }) => {
  return (
    <View style={{ padding: 8, width: scaleFont(27) }}>
      <Text fontType={'BOLD_20'} style={{ color: char === '-' ? GRAY2 : BLACK }}>
        {char}
      </Text>
    </View>
  );
};

const SpaceCodeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<InvitationParams>();
  const inputRef = useRef<TextInput>(null);
  const [inputCode, setInputCode] = useState<string[]>(INITIAL_INVITATION_CODE);
  const { data, isError } = useCheckInvitationQuery(inputCode.join(''), {
    skip: inputCode.filter((str) => str !== '-').length !== 6,
  });

  const onSubmitEditing = async () => {
    if (inputCode.filter((str) => str !== '-').length === 6 && data) {
      dispatch(setNewSpace(data));
      navigation.navigate('Welcome', {
        screenType: 'enterSpace',
        profile: {
          name: data.spaceName,
          image: data.spaceImage,
          description: data.spaceDescription,
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: '20%', alignItems: 'center', width: '100%' }}>
        <Text fontType={'BOLD_20'} style={{ textAlign: 'center' }}>
          초대코드를 입력하여{'\n'}동아리에 참여해 주세요
        </Text>
        <KeyboardAvoidingView
          onTouchEnd={() => inputRef.current?.focus()}
          style={{ width: '100%', alignItems: 'center' }}>
          <View style={[styles.codeNumber, { borderBottomColor: isError ? RED : GRAY4 }]}>
            {inputCode.map((char, index) => (
              <CodeText key={index} char={char} />
            ))}
          </View>
          {isError && (
            <Text fontType={'REGULAR_14'} color={RED} style={{ marginTop: 18 }}>
              입력한 정보를 다시 확인해 주세요
            </Text>
          )}
        </KeyboardAvoidingView>
        <TextInput
          ref={inputRef}
          style={{ display: 'none' }}
          maxLength={6}
          onChangeText={(text: string) => {
            if (text.length > NUM_OF_INVITATION_CODE) return;
            setInputCode([
              ...text.toUpperCase().split(''),
              ...INITIAL_INVITATION_CODE.slice(0, NUM_OF_INVITATION_CODE - text.length),
            ]);
          }}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
      <View style={{ marginBottom: '12%', alignItems: 'center' }}>
        <Text fontType={'REGULAR_14'} style={styles.subText}>
          동아리를 만드실 건가요?
        </Text>
        <LinkButton onPress={() => navigation.navigate('MakeSpace')}>동아리 생성하기</LinkButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    backgroundColor: WHITE,
    padding: 32,
  },
  codeNumber: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 6,
    width: '100%',
    borderBottomWidth: 1,
    marginTop: 60,
  },
  subText: { color: GRAY1, marginTop: 8 },
});

export default SpaceCodeScreen;
