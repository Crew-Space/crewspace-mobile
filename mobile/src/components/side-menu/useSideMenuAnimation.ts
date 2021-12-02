import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

import { HEADER_HEIGHT } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideMenu } from 'store/slices/sideMenu';

const useSideMenuAnimation = (
  width: number,
  duration: number,
): [
  translateAnim: Animated.Value,
  fadeAnim: Animated.Value,
  expanded: boolean,
  toggleExpaned: () => void,
] => {
  const dispatch = useDispatch();
  const expanded = useSelector((state) => state.sideMenu.isOpen);
  const translateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleExpaned = () => dispatch(toggleSideMenu());

  const expandAmin = Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }),
  ]);
  const contractAmin = Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 0.7,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(translateAnim, {
      toValue: width,
      duration: duration,
      useNativeDriver: true,
    }),
  ]);

  useEffect(() => {
    if (!expanded) {
      expandAmin.start();
    } else {
      contractAmin.start();
    }
  }, [expanded]);

  return [translateAnim, fadeAnim, expanded, toggleExpaned];
};

export default useSideMenuAnimation;
