import { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import { SocketContext } from '../../context/SocketContext';
import { MessageType } from '../../types/MessageType';

const useOnMessageSocket = (openConversationID: number) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('conversation-open', ({ conversation, senderEmail }) => {
      axios.get('/messages/' + conversation.id).then((response) => {
        setMessages(response.data);
      });
    });
  }, []);

  useEffect(() => {
    socket.off('message-recieved').on('message-recieved', () => {
      axios.get('/messages/' + openConversationID).then((response) => {
        setMessages(response.data);
      });
    });
  }, [openConversationID]);

  return { messages, setMessages };
};

export default useOnMessageSocket;
