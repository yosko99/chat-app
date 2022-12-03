import React, { useContext, useEffect, useState } from 'react';

import { SocketContext } from '../../context/SocketContext';
import { UserType } from '../../types/UserType';

const useOnOnlineSocket = () => {
  const [onlineUsers, setOnlineUsers] = useState<UserType[]>([]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('online', (onlineUsers: { online: UserType[] }) => {
      setOnlineUsers(onlineUsers.online);
    });
  }, []);

  return { onlineUsers, setOnlineUsers };
};

export default useOnOnlineSocket;
