import { StyleSheet, View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import LoginForm from '../../components/LoginForm';
import LoginLogo from '../../components/svg/LoginLogo';

const LoginScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <View style={{ width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center' }}>
        <LoginLogo />
      </View>
      <LoginForm />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
});

export default LoginScreen;
