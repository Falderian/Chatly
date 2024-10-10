import { TextInput, type TextInputProps, StyleSheet, View } from 'react-native';
import React from 'react';
import { useThemeColors } from '../hooks/useThemeColors';
import { Controller, UseControllerProps, FieldValues } from 'react-hook-form';
import { ThemedText } from './ThemedText';

type Props = UseControllerProps<FieldValues> & TextInputProps;

export const ThemedTextInput: React.FC<Props> = ({ control, name, rules, ...otherProps }) => {
  const [backgroundColor, color, dangerColor, lineColor] = useThemeColors([
    'secondaryBackground' as const,
    'text' as const,
    'danger' as const,
    'gradient1' as const,
  ]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, formState: { errors } }) => (
          <>
            <TextInput
              {...field}
              {...otherProps}
              style={[{ backgroundColor, color, borderColor: errors[name] ? dangerColor : lineColor }, styles.input]}
            />

            <ThemedText darkColor={dangerColor} lightColor={dangerColor} style={{ height: 10 }}>
              <>{errors[name]?.message}</>
            </ThemedText>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  input: {
    borderRadius: 4,
    minHeight: 36,
    paddingHorizontal: 8,
    width: '100%',
    borderWidth: 0.2,
    fontSize: 16,
  },
});
