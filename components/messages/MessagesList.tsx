import { FlatList, StyleSheet, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { IMessage } from '../../types/messagesTypes';

import { useEffect, useRef } from 'react';
import { useColors } from '../../hooks/useColors';
import { ThemedText } from '../ThemedText';

type Props = {
  msgs: IMessage[];
  fetchMoreMsgs: () => void;
};

const MessagesList = ({ msgs, fetchMoreMsgs }: Props) => {
  const { user } = useAuth();
  const colors = useColors();

  const flatListRef = useRef<FlatList<IMessage>>(null);

  useEffect(() => {
    if (msgs.length) {
      flatListRef.current?.scrollToIndex({ index: 0, animated: true });
    }
  }, []);

  const renderMsg = (msg: IMessage) => {
    const isSender = msg.senderId === user?.id;
    const backgroundColor = isSender ? colors.background.tertiary : colors.background.secondary;
    const alignSelf = isSender ? 'flex-end' : 'flex-start';

    const time = new Date(msg.createdAt).toLocaleString(undefined, {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: undefined,
    });

    return (
      <View style={[styles.msg, { backgroundColor, alignSelf }]}>
        <View>
          <ThemedText>{msg.content}</ThemedText>
        </View>
        <View style={styles.msgFooter}>
          <ThemedText style={{ fontSize: 12 }}>{time}</ThemedText>
          <ThemedText style={{ fontSize: 12 }}>|</ThemedText>
          <ThemedText style={{ fontSize: 12 }}>{msg.isRead ? 'Read' : 'Unread'}</ThemedText>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={msgs}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => renderMsg(item)}
      onEndReached={fetchMoreMsgs}
      contentContainerStyle={styles.msgs}
      inverted
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', paddingHorizontal: 8 },
  msgs: {
    gap: 8,
    paddingTop: 8,
  },
  msg: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderEndEndRadius: 0,
    color: 'white',
  },
  msgFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
});

export default MessagesList;
