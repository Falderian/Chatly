import { TLoginUser, TRegisterUser } from '../types/userTypes';

class ApiUrls {
  baseUrl = 'https://dummyjson.com/';
  usersRoot = this.baseUrl + 'users';

  users = {
    register: this.usersRoot + '/add',
    login: this.usersRoot + '/login',
  };
}

class Users {
  register = async (data: TRegisterUser) => {
    return await fetch(new ApiUrls().users.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  login = async (data: TLoginUser) => {
    return await fetch(new ApiUrls().users.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };
}

export default class Api {
  static users = new Users();
}
