import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '../../context/SocketContext';
import { ConversationType } from '../../types/ConversationType';

const useOnConversationOpenSocket = () => {
  const [conversation, setConversation] = useState<ConversationType>({
    id: 0,
    userOne: '',
    userTwo: '',
    senderEmail: '',
    recieverEmail: ''
  });

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on(
      'conversation-open',
      ({ conversation, senderEmail, recieverEmail }) => {
        setConversation({ ...conversation, senderEmail, recieverEmail });
      }
    );
  }, []);

  return { conversation, setConversation };
};

export default useOnConversationOpenSocket;
