import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data);
        } catch (err) {
          console.error('Auth initialization error:', err);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async ({ access_token, refresh_token }) => {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (err) {
      console.error('Login error:', err);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      throw err;
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return false;
    try {
      const response = await api.post('/auth/refresh', {
        token: refreshToken,
      });
      localStorage.setItem('access_token', response.data.access_token);
      const userResponse = await api.get('/auth/me');
      setUser(userResponse.data);
      return true;
    } catch (err) {
      console.error('Refresh token error:', err);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      return false;
    }
  };

  const logout = async () => {
    try {
      const userId = user?.id;
      if (userId) {
        await api.post('/auth/logout', { user_id: userId });
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Correctly imports useContext and returns the hook
export const useAuth = () => {
  return useContext(AuthContext);
};
