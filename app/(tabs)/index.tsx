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
    if (!chats && user) getUserChats(user?.id).then(({ data }) => setChats(data));
  }, [user]);

  return (
    <Loader loading={Boolean(chats)}>
      {chats?.length ? (
        chats.length
      ) : (
        <ThemedView style={styles.container}>
          <ThemedText>No chats were found. Create a one.</ThemedText>
          <Search fetch={searchUsers} placeholder='Begin type to find users' noResultsText='No users were found.' />
        </ThemedView>
      )}
    </Loader>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 4,
  },
});
