import { StyleSheet, useColorScheme } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import RegisterForm from '../../components/RegisterForm';

const RegisterScreen = () => {
  const mode = useColorScheme();
  return (
    <ThemedView style={styles.container}>
      <RegisterForm />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
