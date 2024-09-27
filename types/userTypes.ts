type TUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

type TRegisterUser = Pick<TUser, 'username' | 'email'> & {
  password: string;
  confirmPassword: string;
};

type TLoginUser = Pick<TRegisterUser, 'username' | 'password'>;

export type { TRegisterUser, TLoginUser, TUser };
