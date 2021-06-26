import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    height: 56,
    width: '100%',
  },
  title: {
    color: theme.colors.heading,
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: theme.fonts.text500,
  },
  iconWrapper: {
    alignItems: 'center',
    borderColor: theme.colors.line,
    borderRightWidth: 1,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  icon: {
    height: 18,
    width: 24,
  }
});
