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

const UserProfile = () => {
  const { getUser } = useUserApi();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (id) getUser.mutate(id as string);
  }, [id]);

  const user = useMemo(() => getUser.data, [getUser.data]);

  const icons: TIconName[] = useMemo(() => ['person-add', 'chatbubble-ellipses'], []);

  if (getUser.data?.isContact) icons.splice(0, 1, 'checkmark-circle-outline');

  return (
    <Loader loading={!user}>
      {user && (
        <ThemedView style={styles.container}>
          <UserAvatar size={150} />
          <View style={styles.profile}>
            <ThemedText type='title'>
              {user.firstName} {user.lastName}
            </ThemedText>
            <ThemedText type='defaultSemiBold'>{user.email}</ThemedText>
            <ThemedText>Last activity: {new Date(user.lastActivity!).toLocaleString()}</ThemedText>
          </View>
          <View style={styles.icons}>
            {icons.map(name => (
              <Icon key={name} name={name} size={30} />
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
