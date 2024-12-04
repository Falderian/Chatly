import { StyleSheet } from 'react-native';
import ChatsList from '../../components/chats/ChatsList';
import Search from '../../components/Search';
import { ThemedView } from '../../components/ThemedView';
import useUserApi from '../../hooks/Api/useUserApi';

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
