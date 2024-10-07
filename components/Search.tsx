import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';
import { debounce } from 'lodash';
import { UseMutationResult } from '@tanstack/react-query';
import Loader from './Loader';
import { ThemedText } from './ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons from @expo/vector-icons

type Props = {
  fetch: UseMutationResult<any, Error, string, unknown>;
  noResultsText: string;
};

const Search = ({ fetch, noResultsText, ...props }: Props & TextInputProps) => {
  const [backgroundColor, color, borderColor] = useThemeColors([
    'secondaryBackground' as const,
    'text' as const,
    'gradient1' as const,
  ]);

  const hanldeSearch = debounce(async (text: string) => {
    if (!text) return;
    fetch.mutate(text);
  }, 500);

  return (
    <View>
      <View style={[styles.inputContainer, { borderColor }]}>
        <Ionicons name='search' size={20} color={color} style={styles.icon} />
        <TextInput
          onChangeText={hanldeSearch}
          style={[{ backgroundColor, color }, styles.input]}
          {...props}
          placeholderTextColor={color}
        />
      </View>
      <Loader loading={fetch.isPending}>
        {!fetch.data?.length ? <ThemedText>{noResultsText}</ThemedText> : fetch.data.length}
      </Loader>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    borderRadius: 4,
    minHeight: 36,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 30,
  },
  icon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
});
