import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { TUser } from '../types/userTypes';
import Storage from '../utils/Storage';
import useUserApi from './Api/useUserApi';

type AuthContextType = {
  user: TUser | null;
  setUser: (user: TUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<TUser | null>(null);

  const { getUser } = useUserApi();

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await Storage.getItem('access_token');

      if (!token) {
        router.push('/login');
        return;
      }

      // initSocket(token);

      if (!user) {
        const storedUser = await Storage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const id = await Storage.getItem('id');
          const fetchedUser = await getUser.mutateAsync(id as string);
          setUser(fetchedUser);
          Storage.setItem('user', JSON.stringify(fetchedUser));
        }
      }
    };

    initializeAuth();
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};

AuthProvider.displayName = 'AuthContext';
