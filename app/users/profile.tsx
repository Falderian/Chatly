import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import UserAvatar from '../../components/Avatar';
import Icon from '../../components/Icon';
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

  const icons = useMemo(() => ['person-add' as const, 'send' as const], []);

  return (
    <Loader loading={!user}>
      <ThemedView style={styles.container}>
        <UserAvatar size={150} />
        <View style={styles.profile}>
          <ThemedText type='title'>
            {user?.firstName} {user?.lastName}
          </ThemedText>
          <ThemedText type='defaultSemiBold'>{user?.email}</ThemedText>
          <ThemedText>Last activity: {new Date(user?.lastActivity!).toLocaleString()}</ThemedText>
        </View>
        <View style={styles.icons}>
          {icons.map(name => (
            <Icon key={name} name={name} size={30} />
          ))}
        </View>
      </ThemedView>
    </Loader>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
  },
  profile: {
    display: 'flex',
    gap: 4,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
});

export default UserProfile;
