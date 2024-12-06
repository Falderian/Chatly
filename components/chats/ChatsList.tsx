import { useQueryClient } from '@tanstack/react-query';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
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

  useEffect(() => {
    if (user?.id) getUserChats.mutate(user.id);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        getUserChats.mutate(user.id);
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
          <UserAvatar size={80} />
        </Link>
        <TouchableOpacity onPress={() => goToChat(chat.id, participant.id)} style={styles.chatDetails}>
          <ThemedText type='subtitle'>
            {participant.firstName} {participant.lastName}
          </ThemedText>
          <ThemedText numberOfLines={2} ellipsizeMode='tail'>
            {lastMessage.content}
          </ThemedText>
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
        {getUserChats.data ? (
          <FlatList
            data={getUserChats.data}
            renderItem={({ item }) => renderChat(item)}
            style={styles.container}
            contentContainerStyle={styles.chats}
          />
        ) : (
          <ThemedText>No chats were found</ThemedText>
        )}
      </Loader>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 2,
  },
  chats: {
    gap: 8,
  },
  chat: {
    gap: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  chatDetails: {
    flex: 1,
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
});

export default ChatsList;
