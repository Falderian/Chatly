import { Link, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import useChatsApi from '../../hooks/Api/useChatsApi';
import { IChatWithParticipant } from '../../types/chatTypes';
import { formatDate } from '../../utils/utils';
import UserAvatar from '../Avatar';
import Loader from '../Loader';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { UnreadIcon } from '../UnreadIcon';

const ChatsList = () => {
  const { user } = useAuth();
  const { getUserChats } = useChatsApi();
  const { push } = useRouter();

  useEffect(() => {
    if (user?.id) getUserChats.mutate(user.id);
  }, [user]);

  const goToChat = useCallback(
    (chatId: number, recieverId: number) => push({ pathname: '/chat', params: { id: chatId, recieverId } }),
    [user],
  );

  const renderChat = (chat: IChatWithParticipant) => {
    const { participant, lastMessage } = chat;

    return (
      <View style={styles.chat}>
        <Link key={participant.id} href={`/user/profile?id=${participant.id}`}>
          <UserAvatar size={80} />
        </Link>
        <TouchableOpacity onPress={() => goToChat(chat.id, participant.id)} style={styles.chatDetails}>
          <ThemedText type='subtitle'>
            {participant.firstName} {participant.lastName}
          </ThemedText>
          <ThemedText>{lastMessage.content}</ThemedText>
        </TouchableOpacity>
        <View style={styles.chatMeta}>
          <ThemedText>{formatDate(lastMessage.createdAt)}</ThemedText>
          <UnreadIcon isRead={lastMessage.isRead} />
        </View>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Loader loading={getUserChats.isPending}>
        <FlatList
          data={getUserChats.data}
          renderItem={({ item }) => renderChat(item)}
          style={styles.container}
          contentContainerStyle={styles.chats}
        />
      </Loader>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 8,
  },
  chats: {
    gap: 8,
    width: '100%',
  },
  chat: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    alignItems: 'center',
  },
  chatDetails: {
    flex: 1,
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
});

export default ChatsList;
