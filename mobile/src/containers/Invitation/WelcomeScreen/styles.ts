import { StyleSheet } from 'react-native';
import { BLACK, GRAY1, GRAY3, WHITE } from 'theme/Colors';

export const styles = (darkTheme = false) =>
  StyleSheet.create({
    flexCenter: { alignItems: 'center' },
    container: {
      display: 'flex',
      flex: 1,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: darkTheme ? BLACK : WHITE,
    },
    title: { textAlign: 'center', marginTop: 36, color: darkTheme ? WHITE : BLACK },
    name: {
      textAlign: 'center',
      marginTop: 18,
      marginBottom: 20,
      color: darkTheme ? WHITE : BLACK,
    },
    confetti: { position: 'relative', left: -12, top: 40 },
    description: {
      textAlign: 'center',
      color: darkTheme ? GRAY3 : GRAY1,
    },
    bottomView: { width: '100%', alignItems: 'center', marginBottom: 30 },
  });
