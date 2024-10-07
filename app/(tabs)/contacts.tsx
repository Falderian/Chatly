import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import Search from '../../components/Search';
import useUserApi from '../../hooks/Api/useUserApi';
import { ThemedText } from '../../components/ThemedText';
import Avatar from 'react-avatar';
import UserAvatar from '../../components/Avatar';
import Icon from '../../components/Icon';

const ContactsScreen = () => {
  const { searchUsers } = useUserApi();

  const renderUser = ({ item }: { item: { username: string; id: string } }) => {
    return (
      <View style={styles.userProfile}>
        <UserAvatar username={item.username} />
        <ThemedText>{item.username}</ThemedText>
        <Icon name='new-message' />
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Search fetch={searchUsers} placeholder='Type to search users' noResultsText='No contacts, yet.' />
      <FlatList data={searchUsers.data} renderItem={renderUser} contentContainerStyle={styles.usersContainer} />
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
  },
  usersContainer: {
    display: 'flex',
    gap: 4,
    paddingBottom: 20,
  },
  userProfile: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});

export default ContactsScreen;
