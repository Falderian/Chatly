import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import useUserApi from '../../hooks/Api/useUserApi';
import MessageInput from '../../components/chats/MessageInput';

const Chat = () => {
  const { id, recieverId } = useLocalSearchParams();
  const { getUser } = useUserApi();
  const navigation = useNavigation();

  useEffect(() => {
    getUser.mutateAsync(recieverId.toString()).then(user =>
      navigation.setOptions({
        title: user.firstName + ' ' + user.lastName,
      }),
    );
  }, [recieverId]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText>
        {id} {recieverId}
      </ThemedText>
      <MessageInput senderId={+id} recieverId={+recieverId} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default Chat;
