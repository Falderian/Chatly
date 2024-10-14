import { useMutation } from '@tanstack/react-query';
import Api from '../../utils/Api';

const useContactsApi = () => {
  const createContact = useMutation({
    mutationFn: Api.contacts.createContact,
    onError: e => console.log(e),
  });
  return { createContact };
};

export default useContactsApi;
