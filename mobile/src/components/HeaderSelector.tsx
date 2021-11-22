import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, TextProps, TouchableOpacity, View, ViewProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { search } from 'assets/svg/icons';
import Text from 'components/Text';
import { BLACK, GRAY1, WHITE } from 'theme/Colors';
import ProfileImage from 'components/ProfileImage';
import { RootRouterParams } from 'types/Route';
import { FlatList } from 'react-native-gesture-handler';

interface Props extends ViewProps {
  title: string;
}

const testData = ['동아리', '동아리', '동아리'];

const Component = ({ title, ...resProps }: Props) => (
  <View
    {...resProps}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: WHITE,
      paddingVertical: 18,
      paddingHorizontal: 20,
    }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <ProfileImage
        uri={'https://blog.kakaocdn.net/dn/IKDPO/btqU3oZ8nv9/3nkhB9jPjfUEwCMI6ywIk1/img.jpg'}
        width={24}
        style={{ marginRight: 8 }}
      />
      <Text fontType={'BOLD_18'}>{title}</Text>
    </View>
    {/* <TouchableOpacity onPress={() => navigation.navigate('Search')}>
      <SvgXml xml={search} fill={BLACK} />
    </TouchableOpacity> */}
  </View>
);

const HeaderSelector = () => {
  const navigation = useNavigation<RootRouterParams>();
  const [expended, setExpended] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.spring(fadeAnim, {
      toValue: 100,
      useNativeDriver: true, // Add This line
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.spring(fadeAnim, {
      toValue: 0,
      useNativeDriver: false, // Add This line
    }).start();
  };

  return (
    <View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          opacity: 0.3,
          height: '100%',
          width: '100%',
        }}
      />
      <Component
        title={'해커리어'}
        // onTouchEnd={() => {
        //   console.log('clicked');
        //   fadeIn();
        //   setExpended(!expended);
        // }}
      />
      {expended && (
        <>
          <Animated.View
            style={[
              {
                height: fadeAnim,
              },
            ]}>
            <View style={{ position: 'absolute', top: 0, width: '100%' }}>
              {testData.map((item, index) => (
                <Component key={index} title={item} />
              ))}
            </View>
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fadingText: {
    fontSize: 28,
  },
});

export default HeaderSelector;
