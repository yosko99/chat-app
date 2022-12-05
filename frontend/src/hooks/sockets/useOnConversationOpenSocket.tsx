import { useContext, useEffect } from 'react';

import axios from 'axios';

import { ConversationContext } from '../../context/ConversationContext';
import { MessagesContext } from '../../context/MessagesContext';
import { SocketContext } from '../../context/SocketContext';

const useOnConversationOpenSocket = () => {
  const conversationContext = useContext(ConversationContext);
  const messagesContext = useContext(MessagesContext);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on(
      'conversation-open',
      ({ conversation, senderEmail, recieverEmail }) => {
        axios.get('/messages/' + conversation.id).then((response) => {
          conversationContext!.setConversation({
            ...conversation,
            senderEmail,
            recieverEmail
          });
          messagesContext!.setMessages(response.data);
        });
      }
    );
  }, []);
};

export default useOnConversationOpenSocket;
