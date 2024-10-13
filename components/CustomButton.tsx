import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View, GestureResponderEvent } from 'react-native';
import { useColors } from '../hooks/useColors';

type CustomButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  loading: boolean;
  disabled?: boolean;
};

const CustomButton = ({ title, onPress, loading, disabled }: CustomButtonProps) => {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size='small' color={colors.primary} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            { color: colors.text.default },
            { backgroundColor: disabled ? colors.text.secondary : colors.primary },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
