import { TLoginUser, TRegisterUser } from '../types/userTypes';

class ApiUrls {
  baseUrl = 'http://localhost:1234/';
  usersRoot = this.baseUrl + 'users';
  authRoot = this.baseUrl + 'auth';
  users = {
    register: this.authRoot + '/register',
    login: this.authRoot + '/login',
  };
}

class Users {
  register = async (data: TRegisterUser) => {
    const response = await fetch(new ApiUrls().users.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return Api.handleApiResponse(response);
  };

  login = async (data: TLoginUser) => {
    const response = await fetch(new ApiUrls().users.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return Api.handleApiResponse(response);
  };
}

export default class Api {
  static users = new Users();

  static handleApiResponse = async (response: Response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }
    return response.json();
  };
}
