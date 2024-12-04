import { Ionicons } from '@expo/vector-icons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import React, { ComponentProps } from 'react';
import { useColors } from '../hooks/useColors';

export type TIconName = ComponentProps<typeof Ionicons>['name'];

const Icon = ({ style, ...rest }: IconProps<TIconName>) => {
  const color = useColors().primary;
  return <Ionicons color={rest.color || color} {...rest} />;
};

export default Icon;
