import { Entypo } from '@expo/vector-icons';
import { useThemeColors } from '../hooks/useThemeColors';
import { ComponentProps } from 'react';

type EntypoIconProps = ComponentProps<typeof Entypo>;

const Icon = ({ name }: EntypoIconProps) => {
  const [color] = useThemeColors(['text']);

  return <Entypo name={name} color={color} size={16} />;
};

export default Icon;
