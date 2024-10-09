import { View, FlatList, Button, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { ThemedTextInput } from './ThemedTextInput';
import { FieldValues, useForm } from 'react-hook-form';
import useAuthApi from '../hooks/Api/useAuthApi';
import { TLoginUser } from '../types/userTypes';
import { Link } from 'expo-router';

export default function LoginForm() {
  const { control, handleSubmit, setError } = useForm<FieldValues>({
    defaultValues: {
      email: 'Xavier_Tromp@yahoo.com',
      password: '5Gloria95',
    },
  });
  const { loginMutation } = useAuthApi();

  const fields = [
    {
      name: 'email',
      placeholder: 'Email',
      secureTextEntry: false,
      rules: {
        required: 'Email is required',
      },
    },
    {
      name: 'password',
      placeholder: 'Password',
      secureTextEntry: true,
      rules: {
        required: 'Password is required',
      },
    },
  ];

  const renderItem = ({ item }: { item: (typeof fields)[0] }) => (
    <ThemedTextInput
      control={control}
      name={item.name}
      placeholder={item.placeholder}
      secureTextEntry={item.secureTextEntry}
      rules={item.rules}
    />
  );

  const submit = (data: FieldValues) =>
    loginMutation
      .mutateAsync(data as TLoginUser)
      .catch(e => setError('email', { type: 'manual', message: e.response.data.message }));

  return (
    <ThemedView style={styles.container}>
      <ThemedText type='subtitle' style={styles.title}>
        Connect easily with your family and friends over countries
      </ThemedText>
      <View style={styles.view}>
        <FlatList
          data={fields}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          contentContainerStyle={styles.list}
        />
        <Button title='Login' onPress={handleSubmit(submit)} disabled={loginMutation.isPending} />
      </View>
      <View style={styles.linkContainer}>
        <ThemedText type='default'>Not having an account?</ThemedText>
        <Link href='/register' style={styles.link}>
          Register a new one
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 20,
    width: '100%',
  },
  title: {
    textAlign: 'center',
  },
  view: { width: '100%', gap: 40 },
  list: {
    flex: 1,
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: 'rgb(0, 45, 227)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  linkContainer: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 },
  link: {
    color: 'rgb(135, 159, 255)',
    fontSize: 16,
  },
});
