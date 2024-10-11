import { Avatar, AvatarProps } from 'react-native-elements';
import { getRandomColor } from '@/utils/utils';

type Props = Omit<AvatarProps, 'size'> & { size?: number };

const UserAvatar = ({ size = 40, ...props }: Props) => {
  const randomColor = getRandomColor();

  return <Avatar size={size} {...props} rounded containerStyle={{ backgroundColor: randomColor }} />;
};

export default UserAvatar;
