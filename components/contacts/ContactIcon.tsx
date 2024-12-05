import { memo, useEffect, useRef } from 'react';

import useContactsApi from '../../hooks/Api/useContactsApi';
import IconButton from '../IconButton';

interface ContactIconProps {
  userId: number;
  profileId: string;
}

const ContactIcon: React.FC<ContactIconProps> = memo(({ userId, profileId }) => {
  const { createContact, deleteUserContact, isUserContact } = useContactsApi();
  const isContact = useRef(null);

  useEffect(() => {
    isUserContact.mutateAsync({ userId, contactId: +profileId }).then(res => (isContact.current = res));
  }, []);

  const icon = isContact.current
    ? {
        name: 'checkmark-circle-outline' as const,
        onPress: () =>
          deleteUserContact.mutateAsync([userId, +profileId]).then(res => (isContact.current = res.isContact)),
        loading: deleteUserContact.isPending,
      }
    : {
        name: 'person-add' as const,
        onPress: () =>
          createContact.mutateAsync({ userId, contactId: +profileId }).then(res => (isContact.current = res.isContact)),
        loading: createContact.isPending,
      };

  return (
    <IconButton
      key={icon.name}
      name={icon.name}
      size={30}
      onPress={icon.onPress}
      loading={isContact.current === null || icon.loading}
    />
  );
});

export default ContactIcon;
