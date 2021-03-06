import { PixelRatio, Platform } from 'react-native';
import { GUIDELINE_BASE_WIDTH, SCREEN_WIDTH } from 'theme/Metrics';

export const normalize = (size: number): number => {
  const newSize = size * (SCREEN_WIDTH / GUIDELINE_BASE_WIDTH);

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
