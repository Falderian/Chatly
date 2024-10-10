import { useEffect, useState } from 'react';
import useChatsApi from '../../hooks/Api/useChatsApi';
import { useAuth } from '../../contexts/AuthContext';
import { ThemedText } from '../../components/ThemedText';
import Loader from '../../components/Loader';
import { ThemedView } from '../../components/ThemedView';
import Search from '../../components/Search';
import { StyleSheet } from 'react-native';
import useUserApi from '../../hooks/Api/useUserApi';

export default function ChatsScreen() {
  const { user } = useAuth();
  const { getUserChats } = useChatsApi();
  const { searchUsers } = useUserApi();

  const [chats, setChats] = useState<[] | null>(null);

  useEffect(() => {
    if (!chats && user?.id) getUserChats(user.id).then(({ data }) => setChats(data));
  }, [user]);

  return (
    <Loader loading={Boolean(chats)}>
      {chats?.length ? (
        chats.length
      ) : (
        <ThemedView style={styles.container}>
          <Search fetch={searchUsers} placeholder='Type to search chats' noResultsText='No chats were found.' />
        </ThemedView>
      )}
    </Loader>
  );
}

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
