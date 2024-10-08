import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import Search from '../../components/Search';
import useUserApi from '../../hooks/Api/useUserApi';
import { ThemedText } from '../../components/ThemedText';
import UserAvatar from '../../components/Avatar';
import { useThemeColors } from '../../hooks/useThemeColors';
import { Link } from 'expo-router';
import { TUser } from '../../types/userTypes';

const ContactsScreen = () => {
  const { searchUsers } = useUserApi();
  const [borderColor] = useThemeColors(['secondaryBackground']);

  const renderUser = ({ item }: { item: TUser }) => {
    return (
      <Link style={[styles.userProfile, { borderColor }]} href={`/users/profile?id=${item.id}`}>
        <UserAvatar />
        <View>
          <ThemedText type='defaultSemiBold'>
            {item.firstName} {item.lastName}
          </ThemedText>
          <ThemedText style={{ fontSize: 14 }}>{new Date(item.lastActivity).toLocaleString()}</ThemedText>
        </View>
      </Link>
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
    gap: 8,
    paddingBottom: 20,
  },
  userProfile: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 4,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
});

export default ContactsScreen;
