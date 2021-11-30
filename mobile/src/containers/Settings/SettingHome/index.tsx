import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WHITE } from 'theme/Colors';
import Text from 'components/Text';

const SettingHome = () => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Text fontType={'REGULAR_16'}>SettingHome</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default SettingHome;
