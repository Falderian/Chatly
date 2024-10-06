import { StyleSheet } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { useEffect, useState } from 'react';
import useChatsApi from '../../hooks/Api/useChatsApi';
import { useAuth } from '../../contexts/AuthContext';

export default function ChatsScreen() {
  const { user } = useAuth();
  const { getUserChats } = useChatsApi();

  const [chats, setChats] = useState<[] | null>(null);

  useEffect(() => {
    if (!chats && user) getUserChats(user?.id).then(({ data }) => setChats(data));
  }, [user]);

  return <ThemedView style={styles.container}>{chats?.length}</ThemedView>;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
  },
});
