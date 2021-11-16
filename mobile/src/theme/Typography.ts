import { SCREEN_WIDTH } from 'theme/Metrics';

const GUIDELINE_BASE_WIDTH = 365;

export const FONT = {
  R: 'AppleSDGothicNeoR00',
  B: 'AppleSDGothicNeoB00',
};
export type FONT_SIZE = 10 | 11 | 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 40;
export type LINE_HEIGHT = 17 | 18 | 21 | 24;
export type FONT_WEIGHT = keyof typeof FONT;

export const scaleFont = (size: number) => SCREEN_WIDTH * (size / GUIDELINE_BASE_WIDTH);
