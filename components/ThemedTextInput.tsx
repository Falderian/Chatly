import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { useColors } from '../hooks/useColors';
import { ThemedText } from './ThemedText';

type Props<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  TextInputProps & { showError?: boolean };

export const ThemedTextInput = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  showError = true,
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
              onChangeText={field.onChange}
              style={[
                {
                  backgroundColor: colors.background.secondary,
                  color: colors.text.default,
                  borderColor: errors[name] ? colors.danger : colors.background.primary,
                },
                styles.input,
              ]}
            />

            {showError && (
              <ThemedText darkColor={colors.danger} lightColor={colors.danger} style={{ height: 20 }}>
                {errors[name]?.message?.toString()}
              </ThemedText>
            )}
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
