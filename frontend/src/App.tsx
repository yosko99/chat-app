import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';

import GlobalCSS from './styles/global.css';
import './styles/bootstrap.min.css';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import RegisterPage from './views/RegisterPage';

const socket = io('ws://localhost:5000');

function App () {
  return (
    <BrowserRouter>
      <GlobalCSS />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
