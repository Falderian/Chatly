import { Pressable } from 'react-native';
import Icon from './Icon';
import { router } from 'expo-router';
import { useColors } from '../hooks/useColors';

const BackButton = () => {
  const {
    text: { default: color },
  } = useColors();
  return (
    <Pressable onPress={router.back} style={{ paddingLeft: 14 }}>
      <Icon name='arrow-back' size={24} color={color} />
    </Pressable>
  );
};

export default BackButton;
