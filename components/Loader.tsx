import { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useColors } from '../hooks/useColors';
import { ThemedView } from './ThemedView';

type Props = {
  loading: boolean;
  children?: ReactNode;
};

const Loader = ({ loading, children }: Props) => {
  const color = useColors().primary;
  return (
    <ThemedView style={styles.container}>
      {loading ? <ActivityIndicator size='large' color={color} /> : children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
