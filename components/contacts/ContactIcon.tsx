import { memo, useEffect, useMemo, useRef } from 'react';
import IconButton from '../IconButton';
import useContactsApi from '../../hooks/Api/useContactsApi';
import Spinner from '../Spinner';

interface ContactIconProps {
  userId: number;
  profileId: string;
}

const ContactIcon: React.FC<ContactIconProps> = memo(({ userId, profileId }) => {
  const { createContact, deleteUserContact, isUserContact } = useContactsApi();
  const isContact = useRef();

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
    <IconButton key={icon.name} name={icon.name} size={30} onPress={icon.onPress} loading={icon.loading || false} />
  );
});

export default ContactIcon;
