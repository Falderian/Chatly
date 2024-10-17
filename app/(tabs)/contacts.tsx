import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import Search from '../../components/Search';
import useUserApi from '../../hooks/Api/useUserApi';
import { ThemedText } from '../../components/ThemedText';
import UserAvatar from '../../components/Avatar';

import { Link, useFocusEffect } from 'expo-router';
import { TUser } from '../../types/userTypes';
import { useColors } from '../../hooks/useColors';
import useContactsApi from '../../hooks/Api/useContactsApi';
import { useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ContactsScreen = () => {
  const { user } = useAuth();
  const { searchUsers } = useUserApi();
  const { findUserContacts } = useContactsApi();

  const borderColor = useColors().background.secondary;

  useFocusEffect(
    useCallback(() => {
      if (user?.id && !searchUsers?.data) {
        findUserContacts.mutate(user.id);
      }
    }, [user?.id, searchUsers?.data]),
  );

  const renderUser = useCallback(({ item }: { item: TUser }) => {
    return (
      <Link key={item.id} href={`/user/profile?id=${item.id}`} style={[styles.userProfile, { borderColor }]}>
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
  }, []);

  const data = searchUsers.data || findUserContacts.data || [];

  return (
    <ThemedView style={styles.container}>
      <Search
        fetch={searchUsers}
        placeholder='Type to search users'
        loading={findUserContacts.isPending || searchUsers.isPending}
      />
      <FlatList data={data} renderItem={renderUser} />
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
