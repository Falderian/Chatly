import { StyleSheet } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import LoginForm from '../../components/LoginForm';
import LoginLogo from '../../components/svg/LoginLogo';

const LoginScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <LoginLogo />
      <LoginForm />
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

export default LoginScreen;
