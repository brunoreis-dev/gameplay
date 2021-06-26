import { StyleSheet } from 'react-native';
import { block } from 'react-native-reanimated';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    height: 1,
    width: '78%',
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.secondary40,
  },
});
