import Icon from './Icon';

export const UnreadIcon = ({ isRead }: { isRead: boolean }) => {
  const icon = isRead ? 'mail-open-outline' : 'mail-unread-outline';
  return <Icon name={icon} size={16} />;
};
