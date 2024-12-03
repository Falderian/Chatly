import React, { useMemo } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useColors } from '../hooks/useColors';
import Spinner from './Spinner';

type CustomButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  loading: boolean;
  disabled?: boolean;
};

const CustomButton = ({ title, onPress, loading, disabled }: CustomButtonProps) => {
  const colors = useColors();

  const backgroundColor = useMemo(
    () => (disabled || loading ? colors.text.secondary : colors.primary),
    [loading, disabled],
  );

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress} disabled={disabled || loading}>
      {loading ? <Spinner /> : <Text style={[styles.buttonText, { color: 'white' }, {}]}>{title}</Text>}
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
