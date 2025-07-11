"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface UserType {
  username: string;
}

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

interface RegisterData {
  username: string;
  password: string;
  password2: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

const AuthContext = createContext<AuthContextType & { authLoading: boolean } | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      const storedRefresh = localStorage.getItem('refresh');
      const storedUsername = localStorage.getItem('username');
      if (storedToken && storedRefresh && storedUsername) {
        setToken(storedToken);
        setRefresh(storedRefresh);
        setUser({ username: storedUsername });
      }
      setAuthLoading(false);
    }
  }, []);

  // Helper: refresh access token
  const refreshToken = async () => {
    if (!refresh) return logout();
    const res = await fetch('http://localhost:8000/api/token/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) {
      logout();
      return;
    }
    const data = await res.json();
    setToken(data.access);
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.access);
    }
  };

  const login = async (username: string, password: string) => {
    const res = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    setToken(data.access);
    setRefresh(data.refresh);
    setUser({ username });
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.access);
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('username', username);
    }
    router.push('/');
  };

  const register = async (data: RegisterData) => {
    const res = await fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Registration failed');
    await login(data.username, data.password);
  };

  const logout = () => {
    setToken(null);
    setRefresh(null);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      localStorage.removeItem('username');
    }
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, refreshToken, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}; 