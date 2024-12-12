import { createApi } from '@reduxjs/toolkit/query/react';
import { TLoginUser } from '../../types/userTypes';
import Storage from '../../utils/Storage';
import { setUser } from '../slices/userSlice';
import { baseQuery } from './Api';
import ApiUrls from './ApiUrls';

const onQueryStarted = async (
  _: TLoginUser,
  {
    queryFulfilled,
    dispatch,
  }: {
    queryFulfilled: Promise<{ data: { user: any; token: string } }>;
    dispatch: (action: any) => void;
  },
): Promise<void> => {
  try {
    const { data } = await queryFulfilled;
    dispatch(setUser({ profile: data.user, token: data.token }));
    Storage.setItem('token', data.token);
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: builder => ({
    register: builder.mutation({
      query: (body: TLoginUser) => ({ method: 'POST', url: ApiUrls.users.register, body }),
      onQueryStarted,
    }),
    login: builder.mutation({
      query: (body: TLoginUser) => ({
        method: 'POST',
        url: ApiUrls.users.login,
        body,
      }),
      onQueryStarted,
    }),
    logout: builder.query({
      query: () => 'logout',
    }),
  }),
});

export const { useLoginMutation, useLogoutQuery, useRegisterMutation } = authApi;
