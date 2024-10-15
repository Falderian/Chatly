import { FieldValues, useForm } from 'react-hook-form';
import { ThemedTextInput } from '../ThemedTextInput';
import { StyleSheet, View } from 'react-native';
import Icon from '../Icon';

type Props = {
  senderId: number;
  recieverId: number;
};

const MessageInput = ({ senderId, recieverId }: Props) => {
  const { control } = useForm<FieldValues>({
    defaultValues: {
      senderId,
      recieverId,
      content: '',
    },
  });

  return (
    <View style={styles.contaier}>
      <Icon name='attach' size={32} />
      <View style={{ flex: 1 }}>
        <ThemedTextInput name='content' control={control} />
      </View>
      <Icon name='send' size={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  contaier: { flexDirection: 'row', padding: 8, gap: 8 },
});

export default MessageInput;
