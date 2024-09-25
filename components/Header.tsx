import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

const Header = () => {
  return (
    <ThemedView style={{ paddingTop: 4 }}>
      <ThemedText style={{ textAlign: 'center' }}>Secured Chat</ThemedText>
    </ThemedView>
  );
};

export default Header;
