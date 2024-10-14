import { Pressable } from 'react-native';
import Icon from './Icon';
import { router } from 'expo-router';

const BackButton = () => {
  return (
    <Pressable onPress={router.back} style={{ paddingLeft: 8 }}>
      <Icon name='arrow-back' size={30} />
    </Pressable>
  );
};

export default BackButton;
