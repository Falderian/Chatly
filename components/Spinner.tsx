import { ActivityIndicator } from 'react-native';
import { useColors } from '../hooks/useColors';

const Spinner = () => {
  const { primary } = useColors();

  return <ActivityIndicator size={30} color={primary} />;
};

export default Spinner;
