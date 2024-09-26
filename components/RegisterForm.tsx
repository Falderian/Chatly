import { Button, StyleSheet, FlatList, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Controller, useForm } from 'react-hook-form';
import { ThemedTextInput } from './ThemedTextInput';

type IForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
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

  const renderItem = ({ item }: { item: (typeof fields)[0] }) => (
    <Controller
      control={control}
      name={item.name as keyof IForm}
      rules={item.rules}
      render={({ field }) => (
        <ThemedTextInput
          {...field}
          placeholder={item.placeholder}
          secureTextEntry={item.secureTextEntry}
          error={errors[item.name as keyof IForm]?.message}
        />
      )}
    />
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type='title' style={styles.title}>
        Connect easily with your family and friends over countries
      </ThemedText>
      <View style={styles.view}>
        <FlatList
          data={fields}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          contentContainerStyle={styles.list}
        />
        <Button title='Register' onPress={handleSubmit(console.log)} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },
  title: {
    textAlign: 'center',
  },
  view: { width: '100%', gap: 40 },
  list: {
    width: '100%',
    gap: 20,
  },
});
