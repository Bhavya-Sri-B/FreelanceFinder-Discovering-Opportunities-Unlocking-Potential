import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      axios.get(`${process.env.REACT_APP_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      }).then(res => setUser(res.data)).catch(() => logout());
    }
  }, []);

  useEffect(() => {
    if (user) {
      const newSocket = io(process.env.REACT_APP_API_URL);
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [user]);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('token', tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    if (socket) socket.close();
  };

  return (
    <GeneralContext.Provider value={{ user, token, socket, login, logout }}>
      {children}
    </GeneralContext.Provider>
  );
};