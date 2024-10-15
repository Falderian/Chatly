import axios from 'axios';
import { TLoginUser, TRegisterUser, TUser } from '../types/userTypes';
import Storage from './Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const baseURL = Platform.OS === 'web' ? 'http://127.0.0.1:3000' : 'https://chatly-backend-7z2g.onrender.com';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  if (config.url && config.url.includes('/auth')) return config;

  const token = await AsyncStorage.getItem('access_token');

  if (token) config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('id');
    }
    return Promise.reject(error);
  },
);

class ApiUrls {
  static authRoot = 'auth/';

  static usersRoot = 'users/';
  static users = {
    register: this.authRoot + 'register',
    login: this.authRoot + 'login',
    search: this.usersRoot + 'search/',
  };

  static chatsRoot = 'conversations/';
  static chats = {
    user: this.chatsRoot + 'user/',
  };

  static contactsRoot = 'contacts/';
  static contacts = {
    user: this.contactsRoot + 'user/',
    isContacts: this.contactsRoot + 'is-contact',
  };
}

class Users {
  register = async (data: TRegisterUser) => await api.post(ApiUrls.users.register, data);

  login = async (data: TLoginUser) => {
    const response = await api.post(ApiUrls.users.login, data);

    const { access_token, id } = response.data;

    if (access_token) {
      await Storage.setItem('access_token', access_token);
      await Storage.setItem('id', id.toString());
    }

    return response.data;
  };

  find = async (id: string) => (await api.get<TUser>(ApiUrls.usersRoot + id)).data;

  search = async (username: string) => {
    const response = await api.get<TUser[]>(ApiUrls.users.search, {
      params: { query: username },
    });

    return response.data;
  };
}

class Chats {
  getUserChats = async (id: number) => (await api.get(ApiUrls.chats.user + id)).data;
}

class Contacts {
  createContact = async (data: { userId: number; contactId: number }) =>
    (await api.post(ApiUrls.contactsRoot, data)).data;

  findUserContacs = async (id: number) => (await api.get(ApiUrls.contacts.user, { params: { id } })).data;

  deleteUserContact = async (id: number, contactId: number) =>
    (await api.delete(`${ApiUrls.contactsRoot}${id}/${contactId}`)).data;

  isUserContact = async (userId: number, contactId: number) =>
    (await api.get(ApiUrls.contacts.isContacts, { params: { userId, contactId } })).data;
}
export default class Api {
  static users = new Users();
  static chats = new Chats();
  static contacts = new Contacts();
}
