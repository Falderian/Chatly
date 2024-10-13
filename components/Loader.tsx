import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ReactNode } from 'react';
import { useColors } from '../hooks/useColors';

type Props = {
  loading: boolean;
  children: ReactNode;
};

const Loader = ({ loading, children }: Props) => {
  const color = useColors().safe;
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
