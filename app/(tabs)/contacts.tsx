import { FlatList, StyleSheet, View } from 'react-native';
import UserAvatar from '../../components/Avatar';
import Search from '../../components/Search';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import useUserApi from '../../services/Api/useUserApi';

import { useMutation } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useColors } from '../../hooks/useColors';
import useContactsApi from '../../services/Api/useContactsApi';

import { TUser } from '../../types/userTypes';

const ContactsScreen = () => {
  const { user } = useAuth();
  const { searchUsers } = useUserApi();
  const { findUserContacts } = useContactsApi();
  const borderColor = useColors().background.secondary;

  const [hasSearched, setHasSearched] = useState(false);
  const page = useRef(0);

  const searchUsersMutation = useMutation({
    mutationFn: (query: string) => {
      setHasSearched(!!query);
      return searchUsers.mutateAsync({ query, page: page.current });
    },
  });

  useEffect(() => {
    if (user?.id && !hasSearched) {
      findUserContacts.mutate(user.id);
    }
  }, [user?.id, hasSearched]);

  const renderUser = useCallback(
    ({ item }: { item: TUser }) => {
      return (
        <Link key={item.id} href={`/user/profile?id=${item.id}`} style={[styles.userProfile, { borderColor }]}>
          <UserAvatar />
          <View style={styles.userTexts}>
            <ThemedText type='subtitle'>
              {item.firstName} {item.lastName}
            </ThemedText>
            <ThemedText style={{ fontSize: 14 }}>
              Last activity: {new Date(item.lastActivity).toLocaleString()}
            </ThemedText>
          </View>
        </Link>
      );
    },
    [borderColor],
  );

  const data = searchUsersMutation.data || (hasSearched ? [] : findUserContacts.data) || [];

  return (
    <ThemedView style={styles.container}>
      <Search
        fetch={searchUsersMutation}
        placeholder='Type to search users'
        loading={findUserContacts.isPending || searchUsersMutation.isPending}
      />
      {data.length ? <FlatList data={data} renderItem={renderUser} /> : <ThemedText>No users found</ThemedText>}
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
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 8,
  },
});

export default ContactsScreen;
function useAuth(): { user: any } {
  throw new Error('Function not implemented.');
}
