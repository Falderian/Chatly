import React, { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { useThemeColors } from '../hooks/useThemeColors';

export type TIconName = ComponentProps<typeof Ionicons>['name'];

const Icon = ({ style, ...rest }: IconProps<TIconName>) => {
  const [text] = useThemeColors(['gradient1']);
  return <Ionicons color={rest.color || text} {...rest} />;
};

export default Icon;
