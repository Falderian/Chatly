class ApiUrls {
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

export default new ApiUrls();
