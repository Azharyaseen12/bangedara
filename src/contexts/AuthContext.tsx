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
  updateProfile: (username: string) => Promise<void>;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    if (!response.ok) {
      logout();
      return;
    }
    const data = await response.json();
    setToken(data.access);
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.access);
    }
  };

  const login = async (username: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Registration failed');
    await login(data.username, data.password);
  };

  const updateProfile = async (newUsername: string) => {
    if (!token) throw new Error('Not authenticated');
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile/`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username: newUsername }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.username?.[0] || 'Failed to update profile');
    }
    
    const data = await response.json();
    setUser({ username: data.username });
    if (typeof window !== 'undefined') {
      localStorage.setItem('username', data.username);
    }
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
    <AuthContext.Provider value={{ user, token, login, register, logout, refreshToken, updateProfile, authLoading }}>
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