import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WHITE } from 'theme/Colors';
import Text from 'components/Text';

const EnterCrewScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>EnterCrewScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: WHITE,
    padding: 32,
  },
});

export default EnterCrewScreen;
