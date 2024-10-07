import { Entypo } from '@expo/vector-icons';
import { useThemeColors } from '../hooks/useThemeColors';
import { IconProps } from '@expo/vector-icons/build/createIconSet';

const Icon = ({ name }: IconProps<any>) => {
  const [color] = useThemeColors(['text']);

  return <Entypo name={name} color={color} size={16} />;
};

export default Icon;
