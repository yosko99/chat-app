import React, { useEffect, useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import io from 'socket.io-client';

import GlobalCSS from './styles/global.css';

const socket = io('ws://localhost:5000');

interface ClientInterface {
  id: string,
  name: string
}

function App () {
  const [onlineUsers, setOnlineUsers] = useState<[ClientInterface]>([{
    id: '',
    name: ''
  }]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('connected', prompt('enter name'));
    });

    socket.on('online', (data: {online: [ClientInterface]}) => {
      setOnlineUsers([...data.online]);
    });
  }, []);

  return (
    <BrowserRouter>
      <GlobalCSS />
      {onlineUsers!.length > 0 && onlineUsers!.map((user, index: number) => (
        <h1 key={index}>{user.name}</h1>
      ))}
    </BrowserRouter>
  );
}

export default App;
