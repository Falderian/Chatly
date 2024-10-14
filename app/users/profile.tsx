import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import UserAvatar from '../../components/Avatar';
import Icon, { TIconName } from '../../components/Icon';
import Loader from '../../components/Loader';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import useUserApi from '../../hooks/Api/useUserApi';
import { StyleSheet } from 'react-native';
import IconButton from '../../components/IconButton';
import useContactsApi from '../../hooks/Api/useContactsApi';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  const { getUser } = useUserApi();
  const { createContact } = useContactsApi();
  const profileId = useLocalSearchParams().id;

  useEffect(() => {
    if (profileId) getUser.mutate(profileId.toString());
  }, [profileId]);

  const profile = useMemo(() => getUser.data, [getUser.data]);

  const icons: { name: TIconName; onPress?: () => void }[] = useMemo(
    () => [
      {
        name: 'person-add',
        loading: createContact.isPending,
        onPress: () => {
          createContact.mutate({ userId: user?.id!, contactId: +profileId });
        },
      },
      { name: 'chatbubble-ellipses', onPress: console.warn },
    ],
    [],
  );

  if (getUser.data?.isContact) icons.splice(0, 1, { name: 'checkmark-circle-outline' as const });

  return (
    <Loader loading={!user}>
      {profile && (
        <ThemedView style={styles.container}>
          <UserAvatar size={150} />
          <View style={styles.profile}>
            <ThemedText type='title'>
              {profile.firstName} {profile.lastName}
            </ThemedText>
            <ThemedText type='defaultSemiBold'>{profile.email}</ThemedText>
            <ThemedText>Last activity: {new Date(profile.lastActivity!).toLocaleString()}</ThemedText>
          </View>
          <View style={styles.icons}>
            {icons.map(({ name, onPress }) => (
              <IconButton key={name} name={name} size={30} onPress={onPress} loading={false} />
            ))}
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
