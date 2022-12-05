import { useContext, useEffect } from 'react';

import axios from 'axios';

import { MessagesContext } from '../../context/MessagesContext';
import { SocketContext } from '../../context/SocketContext';

const useOnMessageRecievedSocket = (openConversationID: number) => {
  const messagesContext = useContext(MessagesContext);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.off('message-recieved').on('message-recieved', () => {
      axios.get('/messages/' + openConversationID).then((response) => {
        messagesContext!.setMessages(response.data);
      });
    });
  }, [openConversationID]);
};

export default useOnMessageRecievedSocket;
