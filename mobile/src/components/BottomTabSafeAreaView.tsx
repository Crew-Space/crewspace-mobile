import React from 'react';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

const BottomTabSafeAreaView = ({ children, style, ...restProps }: SafeAreaViewProps) => {
  return (
    <SafeAreaView style={style} edges={['top', 'left', 'right']} {...restProps}>
      {children}
    </SafeAreaView>
  );
};

export default BottomTabSafeAreaView;
