import { FieldValues, useForm } from 'react-hook-form';
import { ThemedTextInput } from '../ThemedTextInput';
import { StyleSheet, View } from 'react-native';
import Icon from '../Icon';
import useMessagesApi from '../../hooks/Api/useMessagesApi';

import Spinner from '../Spinner';
import { IMessage } from '../../types/messagesTypes';
type Props = {
  chatId: number;
  updateMessages: (msg: IMessage) => void;
};

interface IForm extends FieldValues {
  content: string;
}

const MessageInput = ({ chatId, updateMessages }: Props) => {
  const { sendMsg } = useMessagesApi();
  const { control, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      content: '',
    },
  });

  const submit = (data: { content: string }) =>
    sendMsg.mutateAsync({ chatId, msg: data.content }).then((msg: IMessage) => {
      updateMessages(msg);
      reset();
    });

  return (
    <View style={styles.contaier}>
      <Icon name='attach' size={32} />
      <View style={{ flex: 1 }}>
        <ThemedTextInput<IForm> name='content' control={control} />
      </View>
      <View>{sendMsg.isPending ? <Spinner /> : <Icon name='send' size={30} onPress={handleSubmit(submit)} />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  contaier: { flexDirection: 'row', paddingHorizontal: 8, gap: 8, width: '100%' },
});

export default MessageInput;
