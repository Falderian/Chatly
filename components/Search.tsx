import {
  TextInput,
  TextInputProps,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';
import { debounce } from 'lodash';
import { UseMutationResult } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import Loader from './Loader';
import { ThemedText } from './ThemedText';

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
    <>
      <TextInput
        onChangeText={hanldeSearch}
        style={[{ backgroundColor, color, borderColor }, styles.input]}
        {...props}
      />
      <Loader loading={fetch.isPending}>
        {!fetch.data?.length ? <ThemedText>{noResultsText}</ThemedText> : fetch.data.length}
      </Loader>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    minHeight: 36,
    paddingHorizontal: 8,
    width: '100%',
    borderWidth: 0.2,
    fontSize: 16,
  },
});
