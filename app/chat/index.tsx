import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import useUserApi from '../../hooks/Api/useUserApi';
import MessageInput from '../../components/chats/MessageInput';
import Loader from '../../components/Loader';
import useChatsApi from '../../hooks/Api/useChatsApi';
import Spinner from '../../components/Spinner';

const Chat = () => {
  const { id, recieverId } = useLocalSearchParams();
  const { getUser } = useUserApi();
  const { getChatById } = useChatsApi();
  const navigation = useNavigation();

  const [msgs, setMsgs] = useState<[] | null>(null);

  useEffect(() => {
    getChatById.mutateAsync(+id).then(res => {
      setMsgs(res.messages);
    });

    getUser.mutateAsync(recieverId.toString()).then(user =>
      navigation.setOptions({
        title: user.firstName + ' ' + user.lastName,
      }),
    );
  }, [id]);

  if (!msgs) return <Loader loading={true} />;

  return (
    <Loader loading={getChatById.isPending}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.messagesContainer}>
          {msgs.length ? (
            <ThemedText>Messages count : {msgs.length}</ThemedText>
          ) : (
            <ThemedText>No messages in this chat. Send message to begin the conversation.</ThemedText>
          )}
        </ThemedView>
        <MessageInput chatId={getChatById.data?.id} updateMessages={getChatById} />
      </ThemedView>
    </Loader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  messagesContainer: {
    margin: 'auto',
  },
});

export default Chat;
