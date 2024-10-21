import { FlatList, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import useChatsApi from '../../hooks/Api/useChatsApi';
import useUserApi from '../../hooks/Api/useUserApi';
import Loader from '../Loader';
import { ThemedView } from '../ThemedView';
import { IChat } from '../../types/chatTypes';
import { View } from 'react-native';
import { ThemedText } from '../ThemedText';
import UserAvatar from '../Avatar';

const ChatsList = () => {
  const { user } = useAuth();
  const { getUserChats } = useChatsApi();

  useEffect(() => {
    if (user?.id) getUserChats.mutate(user.id);
  }, [user]);

  const renderChat = (chat: IChat) => {
    return (
      <View style={styles.chat}>
        <UserAvatar size={80} />
        <ThemedText>{chat.id}</ThemedText>
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
  chat: { flexDirection: 'row', width: '100%' },
});

export default ChatsList;
