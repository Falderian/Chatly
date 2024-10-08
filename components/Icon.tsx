import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { useThemeColors } from '../hooks/useThemeColors';

type IoniconsIconNames = ComponentProps<typeof Ionicons>['name'];

interface IconProps {
  name: IoniconsIconNames;
  size?: number;
  color?: string;
}

const Icon = ({ name, size = 24, color }: IconProps) => {
  const [text] = useThemeColors(['text']); // Use the theme's text color as the default
  return <Ionicons name={name} size={size} color={color || text} />; // Use the passed color or theme color
};

export default Icon;
