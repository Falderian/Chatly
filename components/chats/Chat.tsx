import { View } from 'react-native';
import { ThemedText } from '../ThemedText';

const Chat = (id: number) => {
  return (
    <View>
      <ThemedText>Chat {id}</ThemedText>
    </View>
  );
};

export default Chat;
