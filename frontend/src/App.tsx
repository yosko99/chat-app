import React, { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';

import GlobalCSS from './styles/global.css';
import './styles/bootstrap.min.css';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';

const socket = io('ws://localhost:5000');

interface ClientInterface {
  id: string;
  name: string;
}

function App () {
  const [onlineUsers, setOnlineUsers] = useState<[ClientInterface]>([
    {
      id: '',
      name: ''
    }
  ]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('connected', prompt('enter name'));
    });

    socket.on('online', (data: { online: [ClientInterface] }) => {
      setOnlineUsers([...data.online]);
    });
  }, []);

  return (
    <BrowserRouter>
      <GlobalCSS />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
