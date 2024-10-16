import { memo, useEffect, useMemo } from 'react';
import IconButton from '../IconButton';
import useContactsApi from '../../hooks/Api/useContactsApi';
import Spinner from '../Spinner';

interface ContactIconProps {
  userId: number;
  profileId: string;
}

const ContactIcon: React.FC<ContactIconProps> = memo(({ userId, profileId }) => {
  const { createContact, deleteUserContact, isUserContact } = useContactsApi();

  useEffect(() => {
    if (isUserContact) isUserContact.mutate({ userId, contactId: +profileId });
  }, []);

  if (!isUserContact) return <Spinner />;

  const icon = isUserContact.data
    ? {
        name: 'checkmark-circle-outline' as const,
        onPress: () =>
          deleteUserContact
            .mutateAsync([userId, +profileId])
            .then(() => isUserContact.mutate({ userId, contactId: +profileId })),
        loading: deleteUserContact.isPending,
      }
    : {
        name: 'person-add' as const,
        onPress: () =>
          createContact
            .mutateAsync({ userId, contactId: +profileId })
            .then(() => isUserContact.mutate({ userId, contactId: +profileId })),
        loading: createContact.isPending,
      };

  return (
    <IconButton key={icon.name} name={icon.name} size={30} onPress={icon.onPress} loading={icon.loading || false} />
  );
});

export default ContactIcon;
