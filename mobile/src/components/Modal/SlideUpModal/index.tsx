import { close } from 'assets/svg/icons';
import SvgIcon from 'components/SvgIcon';
import Text from 'components/Text';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';
import { BLACK, LINE, WHITE } from 'theme/Colors';
import { SCREEN_WIDTH } from 'theme/Metrics';

interface Props extends ViewProps {
  setModalVisible: (visible: boolean) => void;
  isModalVisible: boolean;
  title?: string;
}

const SlideUpModal = ({ children, setModalVisible, isModalVisible, title }: Props) => {
  return (
    <Modal
      style={styles.modal}
      isVisible={isModalVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.7}
      useNativeDriver>
      <View style={styles.container}>
        {title && (
          <View style={styles.title}>
            <SvgIcon xml={close} width={24} onPress={() => setModalVisible(false)} />
            <Text fontType={'BOLD_18'}>{title}</Text>
            <View style={{ width: 24 }} />
          </View>
        )}
        <View style={styles.children}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: SCREEN_WIDTH,
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: getStatusBarHeight(),
  },
  title: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 18,
    justifyContent: 'space-between',
    borderBottomColor: LINE,
    borderBottomWidth: 1,
  },
  children: {
    padding: 20,
    paddingTop: 12,
  },
});

export default SlideUpModal;
