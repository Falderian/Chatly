import { FlatList, StyleSheet, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { IMessage } from '../../types/messagesTypes';

import { useEffect, useRef } from 'react';
import { useColors } from '../../hooks/useColors';
import { ThemedText } from '../ThemedText';

type Props = {
  msgs: IMessage[];
};

const MessagesList = ({ msgs }: Props) => {
  const { user } = useAuth();
  const colors = useColors();

  const flatListRef = useRef<FlatList<IMessage>>(null);

  useEffect(() => {
    if (msgs.length > 0) {
      flatListRef.current?.scrollToIndex({ index: 0, animated: true });
    }
  }, [msgs]);

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
          <ThemedText style={{ fontSize: 12 }}>&#128900;</ThemedText>
          <ThemedText style={{ fontSize: 12 }}>{msg.isRead ? 'Read' : 'Unread'}</ThemedText>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={msgs}
      renderItem={({ item }) => renderMsg(item)}
      style={styles.container}
      contentContainerStyle={styles.msgs}
      inverted
    />
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', padding: 8 },
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
    gap: 4,
  },
});

export default MessagesList;
