import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export function useThemeColors(keys: (keyof (typeof Colors)['light' | 'dark'])[]) {
  const mode = useColorScheme() as 'dark' | 'light';
  return keys.map(key => Colors[mode][key]);
}
