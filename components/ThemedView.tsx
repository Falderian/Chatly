import { View, type ViewProps } from 'react-native';
import { useColors } from '../hooks/useColors';

export function ThemedView({ style, ...otherProps }: ViewProps) {
  const backgroundColor = useColors().background.primary;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
