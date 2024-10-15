import Avatar, { NiceAvatarProps } from '@zamplyy/react-native-nice-avatar';
import { View } from 'react-native';

type Props = Omit<NiceAvatarProps, 'size'> & { size?: number };

const UserAvatar = ({ size = 40, ...props }: Props) => <Avatar size={size} {...props} />;

export default UserAvatar;
