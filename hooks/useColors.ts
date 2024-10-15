import { useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { themeConfig } from '../configs/themeConfig';

export function useColors() {
  const mode = useColorScheme() as 'light' | 'dark';

  const colors = useMemo(() => themeConfig[mode], [mode]);

  return colors;
}
