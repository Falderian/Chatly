import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import UserAvatar from '../../components/Avatar';
import ContactIcon from '../../components/contacts/ContactIcon';
import IconButton from '../../components/IconButton';
import Loader from '../../components/Loader';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useAuth } from '../../contexts/AuthContext';
import useChatsApi from '../../hooks/Api/useChatsApi';
import useUserApi from '../../hooks/Api/useUserApi';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const { getUser } = useUserApi();
  const { getOrCreateChat } = useChatsApi();
  const profileId = useLocalSearchParams().id as string;

  useEffect(() => {
    if (profileId) getUser.mutate(profileId);
  }, [profileId]);

  const chatIcon = useMemo(
    () => ({
      name: 'chatbubble-ellipses' as const,
      onPress: () => {
        getOrCreateChat
          .mutateAsync({ senderId: user!.id, receiverId: +profileId })
          .then(res => router.push({ pathname: '/chat', params: { id: res.id, recieverId: profileId } }));
      },
    }),
    [user],
  );

  return (
    <Loader loading={getUser.isPending}>
      {getUser.data && (
        <ThemedView style={styles.container}>
          <UserAvatar size={150} />
          <View style={styles.profile}>
            <ThemedText type='title'>
              {getUser.data.firstName} {getUser.data.lastName}
            </ThemedText>
            <ThemedText type='defaultSemiBold'>{getUser.data.email}</ThemedText>
            <ThemedText>Last activity: {new Date(getUser.data.lastActivity!).toLocaleString()}</ThemedText>
          </View>
          <View style={styles.icons}>
            <ContactIcon userId={user?.id!} profileId={profileId} />
            <IconButton
              key={chatIcon.name}
              name={chatIcon.name}
              size={30}
              onPress={chatIcon.onPress}
              loading={getUser.isPending}
            />
          </View>
        </ThemedView>
      )}
    </Loader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  profile: {
    gap: 8,
  },
  icons: {
    flexDirection: 'row',
    gap: 72,
  },
});

export default UserProfile;
