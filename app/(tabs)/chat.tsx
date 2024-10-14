import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

const Chat = () => {
  const { id, recieverId } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    if (recieverId) {
      navigation.setOptions({
        title: recieverId,
      });
    }
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText>
        {id} {recieverId}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
