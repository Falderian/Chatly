import { StyleSheet, FlatList, View, Button } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useForm, FieldValues } from 'react-hook-form';
import { ThemedTextInput } from './ThemedTextInput';
import { TRegisterUser } from '../types/userTypes';
import useAuthApi from '../hooks/Api/useAuthApi';
import { Link } from 'expo-router';

export default function RegisterForm() {
  const { registerMutation, loginMutation } = useAuthApi();

  const { control, handleSubmit, watch } = useForm<FieldValues>({
    defaultValues: {
      username: 'emilys',
      email: 'emily.johnson@x.dummyjson.com',
      password: '123ASDasd123!',
      confirmPassword: '123ASDasd123!',
    },
  });

  const fields = [
    {
      name: 'username',
      placeholder: 'Username',
      secureTextEntry: false,
      rules: {
        required: 'Username is required',
      },
    },
    {
      name: 'email',
      placeholder: 'Email',
      secureTextEntry: false,
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address',
        },
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
    {
      name: 'confirmPassword',
      placeholder: 'Confirm Password',
      secureTextEntry: true,
      rules: {
        required: 'You have to confirm your password',
        validate: (value: string) => value === watch('password') || 'Passwords do not match',
      },
    },
  ];

  const submit = (data: FieldValues) => registerMutation.mutate(data as TRegisterUser);

  const renderItem = ({ item }: { item: (typeof fields)[0] }) => (
    <ThemedTextInput
      control={control}
      name={item.name}
      placeholder={item.placeholder}
      secureTextEntry={item.secureTextEntry}
      rules={item.rules}
    />
  );

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
        <Button
          title='Register'
          onPress={handleSubmit(submit)}
          disabled={registerMutation.isPending || loginMutation.isPending}
        />
        <View style={styles.linkContainer}>
          <ThemedText type='default'>Already having an account?</ThemedText>
          <Link href='/login' style={styles.link}>
            Log in
          </Link>
        </View>
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
    minHeight: 270,
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: 'rgb(0, 45, 227)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  linkContainer: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, justifyContent: 'center' },
  link: {
    color: 'rgb(135, 159, 255)',
    fontSize: 16,
  },
});
