import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 42,
    marginTop: getStatusBarHeight() + 26,
    paddingHorizontal: 24,
    width: '100%',
  },
  matches: {
    marginTop: 24,
    marginLeft: 24,
  }
})
