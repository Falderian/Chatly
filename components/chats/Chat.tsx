import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useChatsApi from '../../hooks/Api/useChatsApi';
import useUserApi from '../../hooks/Api/useUserApi';
import { IMessage } from '../../types/messagesTypes';
import Loader from '../Loader';
import MessagesList from '../messages/MessagesList';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import MessageInput from './MessageInput';

const Chat = () => {
  const { id, recieverId } = useLocalSearchParams();
  const { getUser } = useUserApi();
  const { getChatById } = useChatsApi();
  const navigation = useNavigation();

  const [msgs, setMsgs] = useState<IMessage[] | null>(null);

  useEffect(() => {
    getChatById.mutateAsync(+id).then(res => setMsgs(res.messages));
    getUser.mutateAsync(recieverId.toString()).then(user =>
      navigation.setOptions({
        title: user.firstName + ' ' + user.lastName,
      }),
    );
  }, []);

  const updateMessages = (msg: IMessage) =>
    setMsgs(p => {
      const temp = [...p!];
      temp.unshift(msg);
      return temp;
    });

  if (!msgs) return <Loader loading={true} />;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.msgsContainer}>
        <Loader loading={getChatById.isPending}>
          {msgs.length ? (
            <MessagesList msgs={msgs} />
          ) : (
            <ThemedText style={{ padding: 8 }}>
              No messages in this chat. Send message to begin the conversation.
            </ThemedText>
          )}
        </Loader>
      </View>
      <MessageInput chatId={getChatById.data?.id} updateMessages={updateMessages} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  msgsContainer: { maxHeight: '93%', paddingVertical: 8 },
});

export default Chat;
