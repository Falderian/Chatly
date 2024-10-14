import { ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon, { TIconName } from './Icon';
import { UseMutationResult } from '@tanstack/react-query';
import { useColors } from '../hooks/useColors';

type Props = {
  name: TIconName;
  loading: boolean;
  size: number;
  onPress?: () => void;
};

const IconButton = ({ name, loading, size = 24, onPress }: Props) => {
  const { primary } = useColors();
  return (
    <TouchableOpacity onPress={() => onPress?.()}>
      {loading ? <ActivityIndicator color={primary} size={size} /> : <Icon name={name} size={size} />}
    </TouchableOpacity>
  );
};

export default IconButton;
