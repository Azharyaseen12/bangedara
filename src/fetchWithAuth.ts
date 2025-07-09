import { AuthContext } from './contexts/AuthContext';
import React from 'react';

// Usage: await fetchWithAuth(url, options, auth)
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  auth: React.ContextType<typeof AuthContext>
) {
  // Add Authorization header if token exists
  const headers = {
    ...(options.headers || {}),
    ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    'Content-Type': 'application/json',
  };
  // First attempt
  let res = await fetch(url, { ...options, headers });
  if (res.status !== 401) return res;
  // Try to refresh token if 401
  if (auth?.refreshToken) {
    await auth.refreshToken();
    // Try again with new token
    const newHeaders = {
      ...(options.headers || {}),
      ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
      'Content-Type': 'application/json',
    };
    res = await fetch(url, { ...options, headers: newHeaders });
  }
  return res;
} 