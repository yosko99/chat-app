import React, { useContext, useEffect, useState } from 'react';

import UserBubble from '../components/UserBubble';
import { SocketContext } from '../context/SocketContext';
import { UserType } from '../types/UserType';

const MainPage = () => {
  const [onlineUsers, setOnlineUsers] = useState<UserType[]>([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('connected', localStorage.getItem('token'));
    });

    socket.on('online', (onlineUsers: { online: UserType[] }) => {
      setOnlineUsers(onlineUsers.online);
    });
  }, []);

  return (
    <div className="d-flex w-100 shadow p-2">
      {onlineUsers.map((user, index: number) => (
        <UserBubble key={index} imageURL={user.img} online={user.online} />
      ))}
    </div>
  );
};

export default MainPage;
