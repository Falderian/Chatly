import { StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import React from 'react';

const Header = React.memo((props: BottomTabHeaderProps) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type='subtitle'>{props.options.title}</ThemedText>
    </ThemedView>
  );
});

const areEqual = (prevProps: BottomTabHeaderProps, nextProps: BottomTabHeaderProps) =>
  prevProps.options.title === nextProps.options.title;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

const MemoizedHeader = React.memo(Header, areEqual);

export default MemoizedHeader;
