import { useQueryClient } from '@tanstack/react-query';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import useChatsApi from '../../hooks/Api/useChatsApi';
import { useColors } from '../../hooks/useColors';
import { IChatWithParticipant } from '../../types/chatTypes';
import { formatDate } from '../../utils/utils';
import UserAvatar from '../Avatar';
import Loader from '../Loader';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { UnreadIcon } from '../UnreadIcon';

const ChatsList = () => {
  const { push } = useRouter();
  const { user } = useAuth();
  const { getUserChats } = useChatsApi();
  const queryClient = useQueryClient();
  const borderColor = useColors().background.secondary;

  const page = useRef(0).current;

  useEffect(() => {
    if (user?.id) getUserChats.mutate({ id: user.id, page });
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        getUserChats.mutate({ id: user.id, page });
      }
      return async () => {
        await queryClient.setQueryData(['userChats', user?.id], []);
      };
    }, [user]),
  );

  const goToChat = useCallback(
    (chatId: number, recieverId: number) => push({ pathname: '/chat', params: { id: chatId, recieverId } }),
    [user],
  );

  const renderChat = (chat: IChatWithParticipant) => {
    const { participant, lastMessage } = chat;

    return (
      <View style={[styles.chat, { borderColor }]}>
        <Link key={participant.id} href={`/user/profile?id=${participant.id}`}>
          <UserAvatar />
        </Link>
        <TouchableOpacity onPress={() => goToChat(chat.id, participant.id)} style={styles.chatDetails}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 2 }}>
            <ThemedText type='subtitle' style={{ flex: 1 }} numberOfLines={1} ellipsizeMode='tail'>
              {participant.firstName} {participant.lastName}
            </ThemedText>
            <View style={styles.chatMeta}>
              <UnreadIcon isRead={lastMessage.isRead} />
              <ThemedText style={{ fontSize: 14 }}>{formatDate(lastMessage.createdAt)}</ThemedText>
            </View>
          </View>
          <ThemedText numberOfLines={1} ellipsizeMode='tail'>
            {lastMessage.content}
          </ThemedText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Loader loading={getUserChats.isPending}>
        {getUserChats.data ? (
          <FlatList data={getUserChats.data} renderItem={({ item }) => renderChat(item)} style={styles.container} />
        ) : (
          <ThemedText>No chats were found</ThemedText>
        )}
      </Loader>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 2, width: '100%' },

  chat: {
    gap: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  chatDetails: { flexDirection: 'column', flex: 1 },
  chatMeta: { alignItems: 'center', flexDirection: 'row', gap: 2 },
});

export default ChatsList;
