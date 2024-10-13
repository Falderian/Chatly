import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import Search from '../../components/Search';
import useUserApi from '../../hooks/Api/useUserApi';
import { ThemedText } from '../../components/ThemedText';
import UserAvatar from '../../components/Avatar';

import { Link } from 'expo-router';
import { TUser } from '../../types/userTypes';
import { useColors } from '../../hooks/useColors';

const ContactsScreen = () => {
  const { searchUsers } = useUserApi();
  const borderColor = useColors().background.secondary;

  const renderUser = ({ item }: { item: TUser }) => {
    return (
      <Link key={item.id} href={`/users/profile?id=${item.id}`} style={[styles.userProfile, { borderColor }]}>
        <UserAvatar size={80} />
        <View style={styles.userTexts}>
          <ThemedText type='subtitle'>
            {item.firstName} {item.lastName}
          </ThemedText>
          <ThemedText style={{ fontSize: 14 }}>
            Last acitivity: {new Date(item.lastActivity).toLocaleString()}
          </ThemedText>
        </View>
      </Link>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Search fetch={searchUsers} placeholder='Type to search users' />
      <FlatList data={searchUsers.data} renderItem={renderUser} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 8,
  },
  userProfile: {
    borderBottomWidth: 2,
    paddingVertical: 8,
  },
  userTexts: {
    paddingLeft: 8,
  },
});

export default ContactsScreen;
