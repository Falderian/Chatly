import { TextInput, type TextInputProps, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useThemeColors } from '../hooks/useThemeColors';

interface ThemedTextInputProps extends TextInputProps {
  error?: string;
}

export const ThemedTextInput = React.forwardRef<TextInput, ThemedTextInputProps>(({ error, ...otherProps }, ref) => {
  const [backgroundColor, color, dangerColor] = useThemeColors([
    'secondaryBackground' as const,
    'text' as const,
    'danger' as const,
  ]);
  const borderColor = error ? dangerColor : 'none';
  return (
    <View style={styles.container}>
      <TextInput {...otherProps} ref={ref} style={[{ backgroundColor, color, borderColor }, styles.input]} />
      {error && <Text style={{ color: dangerColor }}>{error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { width: '100%', display: 'flex', alignItems: 'center', gap: 4, padding: 4 },
  input: {
    borderRadius: 4,
    minHeight: 36,
    paddingHorizontal: 8,
    width: '100%',
    borderWidth: 0.5,
  },
});
