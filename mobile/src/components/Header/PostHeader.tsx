import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { RootRouterParams } from 'types/Route';
import SvgIcon from 'components/SvgIcon';
import { close, expandMore } from 'assets/svg/icons';
import Text from 'components/Text';
import { BLACK, LINE, PRIMARY, WHITE } from 'theme/Colors';
import { normalize } from 'utils';
import { SCREEN_HEIGHT } from 'theme/Metrics';

const mock = ['일상 공유', '일반 글', '인사이트'];
const HEADER_HEIGHT = normalize(60);

const PostHeader = () => {
  const [extanded, setExtanded] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const navigation = useNavigation<RootRouterParams>();
  const translateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!extanded) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: HEADER_HEIGHT * (mock.length + 1),
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extanded]);

  return (
    <>
      {extanded && (
        <Animated.View
          style={[styles.background, { opacity: fadeAnim }]}
          onTouchEnd={() => setExtanded(!extanded)}
        />
      )}
      <View style={{ height: getStatusBarHeight(), backgroundColor: WHITE, zIndex: 1 }} />
      <View>
        <View style={[styles.itemContainer, styles.container]}>
          <SvgIcon xml={close} width={24} onPress={() => navigation.goBack()} />
          <View style={styles.title} onTouchEnd={() => setExtanded(!extanded)}>
            <Text fontType={'BOLD_18'}>{mock[selectedItem]}</Text>
            <SvgIcon xml={!extanded ? expandMore.down : expandMore.up} width={20} />
          </View>
          <Text color={PRIMARY}>등록</Text>
        </View>
        <Animated.View style={[styles.expandList, { transform: [{ translateY: translateAnim }] }]}>
          {mock
            .filter((name) => name !== mock[selectedItem])
            .map((name, index) => (
              <View
                key={index}
                style={styles.itemContainer}
                onTouchEnd={() => {
                  setSelectedItem(index);
                  setExtanded(!extanded);
                }}>
                <Text fontType={'BOLD_18'}>{name}</Text>
              </View>
            ))}
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  itemContainer: {
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    height: HEADER_HEIGHT,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandList: {
    zIndex: 0,
    position: 'absolute',
    top: -(HEADER_HEIGHT * mock.length),
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    backgroundColor: BLACK,
    opacity: 0.3,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT,
  },
});

export default PostHeader;
