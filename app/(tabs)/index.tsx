import { useEffect, useState } from 'react';
import useChatsApi from '../../hooks/Api/useChatsApi';
import { useAuth } from '../../contexts/AuthContext';
import { ThemedText } from '../../components/ThemedText';
import Loader from '../../components/Loader';
import { ThemedView } from '../../components/ThemedView';
import Search from '../../components/Search';
import { StyleSheet } from 'react-native';
import useUserApi from '../../hooks/Api/useUserApi';
import ChatsList from '../../components/chats/ChatsList';

const ChatsScreen = () => {
  const { searchUsers } = useUserApi();

  return (
    <ThemedView style={styles.container}>
      <Search fetch={searchUsers} placeholder='Type to search chats' />
      <ChatsList />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    gap: 4,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
});

export default ChatsScreen;
