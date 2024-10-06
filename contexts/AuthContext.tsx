import React, { createContext, useState, useContext, useEffect } from 'react';
import { TUser } from '../types/userTypes';
import { useRouter } from 'expo-router';
import Storage from '../utils/Storage';
import useUserApi from '../hooks/Api/useUserApi';

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
    if (!user)
      Storage.getItem('id').then(async id => {
        if (!id) router.push('/login');
        else setUser(await getUser(id));
      });
  }, []);

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};

AuthProvider.displayName = 'AuthContext';
