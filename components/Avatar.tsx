import Avatar from 'react-avatar';

const UserAvatar = ({ username }: { username: string }) => <Avatar name={username} size='34px' round='10px' />;

export default UserAvatar;
