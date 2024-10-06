import axios from 'axios';
import { TLoginUser, TRegisterUser } from '../types/userTypes';
import Storage from './Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://localhost:1234/';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('Access token is not available in AsyncStorage.');
    }
  } catch (error) {
    console.error('Error retrieving access token from storage:', error);
  }

  return config;
});

class ApiUrls {
  static authRoot = 'auth/';

  static usersRoot = 'users/';
  static users = {
    register: this.authRoot + 'register',
    login: this.authRoot + 'login',
    search: this.usersRoot + 'name/',
  };

  static chatsRoot = 'conversations/';
  static chats = {
    user: this.chatsRoot + 'user/',
  };
}

class Users {
  register = async (data: TRegisterUser) => await api.post(ApiUrls.users.register, data);

  login = async (data: TLoginUser) => {
    const response = await api.post(ApiUrls.users.login, data);

    const { access_token, id } = response.data;

    if (access_token) {
      await Storage.setItem('access_token', access_token);
      await Storage.setItem('id', id);
    }

    return response.data;
  };

  find = async (id: string) => (await api.get(ApiUrls.usersRoot + id)).data;

  search = async (username: string) => (await api.get(ApiUrls.users.search + username)).data;
}

class Chats {
  getUserChats = async (id: number) => (await api.get(ApiUrls.chats.user + id)).data;
}

export default class Api {
  static users = new Users();
  static chats = new Chats();
}
