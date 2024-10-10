import Avatar, { NiceAvatarProps } from '@zamplyy/react-native-nice-avatar';

type Props = Omit<NiceAvatarProps, 'size'> & { size?: number };

const UserAvatar = ({ size = 40, ...props }: Props) => <Avatar size={size} {...props} />;

export default UserAvatar;
