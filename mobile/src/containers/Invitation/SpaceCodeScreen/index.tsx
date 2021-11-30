import React, { useCallback, useRef, useState } from 'react';
import { DeviceEventEmitter, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

import { INITIAL_INVITATION_CODE, NUM_OF_INVITATION_CODE } from 'constant';
import { scaleFont } from 'theme/Typography';
import { BLACK, GRAY1, GRAY2, GRAY4, RED, WHITE } from 'theme/Colors';
import { RootRouterParams } from 'types/Route';
import LinkButton from 'components/LinkButton';
import Text from 'components/Text';
import { welcomeParams } from 'constant/welcome';
import CustomEvent from 'constant/customEvent';
import { useCheckInvitationQuery } from 'store/services/space';

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
  const navigation = useNavigation<RootRouterParams>();
  const inputRef = useRef<TextInput>(null);
  const [inputCode, setInputCode] = useState<string[]>(INITIAL_INVITATION_CODE);
  const { data, isError, isLoading } = useCheckInvitationQuery(inputCode.join(''), {
    skip: inputCode.filter((str) => str !== '-').length !== 6,
  });

  const onMakeSpacePress = () => {
    navigation.navigate('Invitation', { screen: 'CreateSpace' });
  };

  const onSubmitEditing = async () => {
    if (inputCode.filter((str) => str !== '-').length === 6 && data) {
      navigation.replace('Invitation', {
        screen: 'Welcome',
        params: {
          darkTheme: true,
          data: {
            ...welcomeParams.enterSpace,
            profile: {
              name: data.spaceName,
              imageUrl: data.spaceImage,
              description: data.spaceDescription,
            },
            space: data,
          },
        },
      });
    }
  };

  DeviceEventEmitter.addListener(CustomEvent.welcomeMainButton.name, async (space) => {
    navigation.replace('Invitation', {
      screen: 'EnterSpace',
      params: {
        space,
      },
    });
  });

  DeviceEventEmitter.addListener(CustomEvent.welcomeSubButton.name, () =>
    navigation.replace('Invitation'),
  );

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
              ...text.split(''),
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
        <LinkButton onPress={onMakeSpacePress}>동아리 생성하기</LinkButton>
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
