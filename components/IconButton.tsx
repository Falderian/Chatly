import { ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon, { TIconName } from './Icon';
import { UseMutationResult } from '@tanstack/react-query';
import { useColors } from '../hooks/useColors';
import Spinner from './Spinner';

type Props = {
  name: TIconName;
  loading: boolean;
  size: number;
  onPress?: () => void;
};

const IconButton = ({ name, loading, size = 24, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress?.()}>
      {loading ? <Spinner /> : <Icon name={name} size={size} />}
    </TouchableOpacity>
  );
};

export default IconButton;
