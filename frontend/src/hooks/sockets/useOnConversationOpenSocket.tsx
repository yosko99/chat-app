import React, { useContext, useEffect, useState } from 'react';

import { SocketContext } from '../../context/SocketContext';
import { ConversationType } from '../../types/ConversationType';

const useOnConversationOpenSocket = () => {
  const [conversation, setConversation] = useState<ConversationType>({
    id: 0,
    userOne: '',
    userTwo: ''
  });

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('conversation-open', ({ conversation, senderEmail }) => {
      const recieverEmail =
        conversation.userOne === senderEmail
          ? conversation.userTwo
          : conversation.userOne;

      setConversation({ ...conversation, emailOfReciever: recieverEmail });
    });
  }, []);

  return { conversation, setConversation };
};

export default useOnConversationOpenSocket;
