'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('acme_user');
      if (saved) {
        try {
          setUser(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse user:', e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call your backend
    if (email && password.length >= 6) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
      };
      setUser(newUser);
      localStorage.setItem('acme_user', JSON.stringify(newUser));
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - in production, this would call your backend
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
      };
      setUser(newUser);
      localStorage.setItem('acme_user', JSON.stringify(newUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('acme_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
