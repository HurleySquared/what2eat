import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/types/user';

interface UserContextValue {
  user: User;
  updateUser: (updates: Partial<User>) => void;
}

const DEFAULT_USER: User = {
  nickname: 'Foodie',
  email: '',
  password: '',
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(DEFAULT_USER);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}
