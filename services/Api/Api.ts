import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

const baseQuery = fetchBaseQuery({ baseUrl });

class Endopoints {
  authRoot = 'auth/';

  usersRoot = 'users/';
  users = {
    register: this.authRoot + 'register',
    login: this.authRoot + 'login',
    search: this.usersRoot + 'search/',
  };

  chatsRoot = 'conversations/';
  chats = {
    user: this.chatsRoot + 'user/',
    messages: this.chatsRoot + 'messages/',
  };

  contactsRoot = 'contacts/';
  contacts = {
    user: this.contactsRoot + 'user/',
    isContacts: this.contactsRoot + 'is-contact',
  };

  messagesRoot = 'messages/';
}

const ApiUrls = new Endopoints();

export { ApiUrls, baseQuery };
