import { TextInput, type TextInputProps, StyleSheet, View } from 'react-native';
import React from 'react';
import { Controller, UseControllerProps, FieldValues } from 'react-hook-form';
import { ThemedText } from './ThemedText';
import { useColors } from '../hooks/useColors';

type Props<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> & TextInputProps;

export const ThemedTextInput = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  ...otherProps
}: Props<TFieldValues>) => {
  const colors = useColors();
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
              style={[
                {
                  backgroundColor: colors.background.secondary,
                  color: colors.text.default,
                  borderColor: errors[name] ? colors.danger : colors.background.primary,
                },
                styles.input,
              ]}
            />

            <ThemedText darkColor={colors.danger} lightColor={colors.danger} style={{ height: 10 }}>
              {errors[name]?.message?.toString()}
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
