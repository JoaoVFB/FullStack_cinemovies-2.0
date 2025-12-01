import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api'; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Efeito para carregar o usuário ao iniciar a aplicação
  useEffect(() => {
    if (token) {
      // Tenta carregar os dados do usuário do localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      }
    }
    setLoading(false);
  }, [token]);

  // Função de Login
  const login = async (email, password) => {
    try {
      const response = await api.post(`/auth/login`, { email, password });
      const { token: newToken, user: userData } = response.data;

      // Armazena o token e os dados do usuário
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Erro no login:", error.response?.data || error.message);
      // Lança o erro para ser tratado no componente de login
      throw new Error(error.response?.data?.error || "Falha ao conectar com o servidor.");
    }
  };

  // Função de Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
