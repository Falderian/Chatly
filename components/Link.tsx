import { Link as ExpoLink, LinkProps } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';

type Props = {} & LinkProps<string>;

const Link = ({ ...props }: Props) => {
  const [color] = useThemeColors(['gradient1']);

  return <ExpoLink style={{ color }} {...props} />;
};

export default Link;
