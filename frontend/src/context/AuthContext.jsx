import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.info('Logged out successfully');
    navigate('/login');
  }, [navigate]);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/profile');
      if (data.success) {
        const payload = data.data;
        setUser(payload?.user ?? payload);
      }
    } catch {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        fetchProfile().finally(() => setLoading(false));
      } else {
        logout();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [token, fetchProfile, logout]);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      setToken(data.data.token);
      setUser(data.data.user ?? data.data);
      toast.success('Welcome back!');
      navigate('/');
    }
    return data;
  }, [navigate]);

  const register = useCallback(async (formData) => {
    const { firstName, lastName, email, password, phone } = formData;
    const { data } = await api.post('/auth/register', {
      first_name: firstName?.trim(),
      last_name: lastName?.trim(),
      email: email?.trim(),
      password,
      phone: phone?.replace(/\D/g, '').slice(0, 10) || undefined,
    });
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      setToken(data.data.token);
      setUser(data.data.user ?? data.data);
      toast.success('Account created successfully!');
      navigate('/');
    }
    return data;
  }, [navigate]);

  const updateProfile = useCallback(async (formData) => {
    const { firstName, lastName, phone } = formData;
    const { data } = await api.put('/auth/profile', {
      first_name: firstName?.trim(),
      last_name: lastName?.trim(),
      phone: phone?.replace(/\D/g, '').slice(0, 10) || undefined,
    });
    if (data.success) {
      const payload = data.data;
      setUser(payload?.user ?? payload);
      toast.success('Profile updated!');
    }
    return data;
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;
