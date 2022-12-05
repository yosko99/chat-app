import { useContext, useEffect } from 'react';

import { OnlineUsersContext } from '../../context/OnlineUsersContext';
import { SocketContext } from '../../context/SocketContext';
import { UserType } from '../../types/UserType';

const useOnOnlineSocket = () => {
  const onlineUsersContext = useContext(OnlineUsersContext);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('online', (onlineUsers: { online: UserType[] }) => {
      onlineUsersContext!.setOnlineUsers(onlineUsers.online);
    });
  }, []);
};

export default useOnOnlineSocket;
