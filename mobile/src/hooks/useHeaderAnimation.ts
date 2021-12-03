import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

import { HEADER_HEIGHT } from 'constant';

const useHeaderAnimation = (): [
  categoryLength: number,
  setCategoryLength: (num: number) => void,
  translateAnim: Animated.Value,
  fadeAnim: Animated.Value,
  expanded: boolean,
  toggleExpaned: () => void,
] => {
  const [expanded, setExpaned] = useState<boolean>(false);
  const [categoryLength, setCategoryLength] = useState(0);
  const translateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleExpaned = () => setExpaned(!expanded);

  const expandAmin = Animated.parallel([
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
  ]);
  const contractAmin = Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 0.7,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(translateAnim, {
      toValue: HEADER_HEIGHT * (categoryLength + 1),
      duration: 300,
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

  return [categoryLength, setCategoryLength, translateAnim, fadeAnim, expanded, toggleExpaned];
};

export default useHeaderAnimation;
