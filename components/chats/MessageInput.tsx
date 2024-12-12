import { FieldValues, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import useMessagesApi from '../../services/Api/useMessagesApi';
import Icon from '../Icon';
import { ThemedTextInput } from '../ThemedTextInput';

import { IMessage } from '../../types/messagesTypes';
import Spinner from '../Spinner';
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
    <View style={styles.container}>
      <Icon name='attach' size={32} />
      <View style={{ width: '75%', alignItems: 'center' }}>
        <ThemedTextInput<IForm> name='content' control={control} showError={false} />
      </View>
      <View>{sendMsg.isPending ? <Spinner /> : <Icon name='send' size={30} onPress={handleSubmit(submit)} />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MessageInput;
