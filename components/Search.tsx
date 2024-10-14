import { TextInput, TextInputProps, StyleSheet, View, ActivityIndicator } from 'react-native';

import { debounce } from 'lodash';
import { UseMutationResult } from '@tanstack/react-query';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColors } from '../hooks/useColors';

type Props = {
  fetch: UseMutationResult<any, Error, string, unknown>;
};

const Search = ({ fetch, ...props }: Props & TextInputProps) => {
  const colors = useColors();

  const handleSearch = debounce(async (text: string) => {
    if (!text) fetch.reset();
    else fetch.mutate(text);
  }, 500);

  return (
    <View style={[styles.inputContainer]}>
      {fetch.isPending ? (
        <ActivityIndicator size='small' color={colors.primary} style={styles.icon} />
      ) : (
        <Ionicons name='search' size={20} color={colors.primary} style={styles.icon} />
      )}
      <TextInput
        onChangeText={handleSearch}
        style={[{ backgroundColor: colors.background.secondary, color: colors.text.default }, styles.input]}
        {...props}
        placeholderTextColor={colors.text.secondary}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  input: {
    fontSize: 16,
    minHeight: 32,
    paddingLeft: 35,
    borderRadius: 8,
    borderWidth: 0,
    flex: 1,
  },
  icon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
});
