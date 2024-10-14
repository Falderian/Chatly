import { useMutation } from '@tanstack/react-query';
import Api from '../../utils/Api';

const useContactsApi = () => {
  const createContact = useMutation({
    mutationFn: Api.contacts.createContact,
    onError: e => console.log(e),
  });

  const findUserContacts = useMutation({
    mutationFn: Api.contacts.findUserContacs,
    onError: e => console.log(e),
  });

  const deleteUserContact = useMutation({
    mutationFn: (ids: number[]) => Api.contacts.deleteUserContact(ids[0], ids[1]),
    onError: e => console.log(e),
  });
  return { createContact, findUserContacts, deleteUserContact };
};

export default useContactsApi;
