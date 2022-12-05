import React, { useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';

import { ConversationContext } from './context/ConversationContext';
import { MessagesContext } from './context/MessagesContext';
import { SocketContext } from './context/SocketContext';
import GlobalCSS from './styles/global.css';
import './styles/bootstrap.min.css';
import { ConversationType } from './types/ConversationType';
import { MessageType } from './types/MessageType';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import RegisterPage from './views/RegisterPage';

const socket = io('ws://localhost:5000');

const App = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversation, setConversation] = useState<ConversationType>({
    id: 0,
    userOne: '',
    userTwo: '',
    senderEmail: '',
    recieverEmail: ''
  });

  return (
    <BrowserRouter>
      <ConversationContext.Provider value={{ conversation, setConversation }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <SocketContext.Provider value={socket}>
            <GlobalCSS />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </SocketContext.Provider>
        </MessagesContext.Provider>
      </ConversationContext.Provider>
    </BrowserRouter>
  );
};

export default App;
