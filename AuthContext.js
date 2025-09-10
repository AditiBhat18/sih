import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Check if user is logged in on mount
    if (token) {
      // In a real app, you would validate the token with the backend
      // For now, just set loading to false
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      // This would make an API call to login
      console.log('Login attempt:', email, password);
      
      // Mock successful login
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email,
        role: 'student',
        totalPoints: 1250,
        level: 5,
        streak: 7
      };
      
      const mockToken = 'mock-jwt-token';
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      // This would make an API call to register
      console.log('Register attempt:', name, email, password, role);
      
      // Mock successful registration
      const mockUser = {
        id: '1',
        name,
        email,
        role,
        totalPoints: 0,
        level: 1,
        streak: 0
      };
      
      const mockToken = 'mock-jwt-token';
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
