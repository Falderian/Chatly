import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import useMessagesApi from '../../hooks/Api/useMessagesApi';
import useUserApi from '../../hooks/Api/useUserApi';
import { IMessage } from '../../types/messagesTypes';
import Loader from '../Loader';
import MessagesList from '../messages/MessagesList';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import MessageInput from './MessageInput';

import { useState } from 'react';

const Chat = () => {
  const { id, recieverId } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const { getUser } = useUserApi();
  const { getMsgs, hasMore } = useMessagesApi();
  const navigation = useNavigation();

  const [cachedMessages, setCachedMessages] = useState<IMessage[]>([]);
  const page = useRef(0);

  useEffect(() => {
    getMsgs.mutateAsync({ id: +id, page: page.current }).then(data => {
      setCachedMessages(data || []);
    });
    getUser.mutateAsync(recieverId.toString()).then(user =>
      navigation.setOptions({
        title: user.firstName + ' ' + user.lastName,
      }),
    );
    return () => {
      queryClient.removeQueries();
    };
  }, []);

  const fetchMoreMsgs = () => {
    if (!hasMore) return;
    ++page.current;
    getMsgs.mutateAsync({ id: +id, page: page.current }).then(data => {
      setCachedMessages(prev => [...prev, ...(data || [])]);
    });
  };

  const updateMessages = (newMsg: IMessage) => {
    setCachedMessages(prev => [newMsg, ...prev]);
    queryClient.setQueryData<IMessage[]>(['messages', +id], oldMsgs => [...(oldMsgs || []), newMsg]);
  };

  if (!cachedMessages.length && getMsgs.isPending) return <Loader loading={true} />;
  return (
    <ThemedView style={styles.container}>
      <View style={styles.msgsContainer}>
        {cachedMessages.length ? (
          <MessagesList msgs={cachedMessages} fetchMoreMsgs={fetchMoreMsgs} />
        ) : (
          <ThemedText style={{ padding: 8 }}>
            No messages in this chat. Send message to begin the conversation.
          </ThemedText>
        )}
      </View>
      <MessageInput chatId={+id} updateMessages={updateMessages} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  msgsContainer: { maxHeight: '93%', paddingVertical: 8 },
});

export default Chat;
