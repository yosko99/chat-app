import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import Conversation from '../components/Conversation';
import Message from '../components/Message';
import UserBubble from '../components/UserBubble';
import { SocketContext } from '../context/SocketContext';
import { ConversationType } from '../types/ConversationType';
import { MessageType } from '../types/MessageType';
import { UserType } from '../types/UserType';

const MainPage = () => {
  const [onlineUsers, setOnlineUsers] = useState<UserType[]>([]);
  const [conversation, setConversation] = useState<ConversationType>({
    id: 0,
    userOne: '',
    userTwo: ''
  });
  const [messages, setMessages] = useState<MessageType[]>([]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('connected', localStorage.getItem('token'));
    });

    socket.on('online', (onlineUsers: { online: UserType[] }) => {
      setOnlineUsers(onlineUsers.online);
    });

    socket.on('conversation-open', ({ conversation, senderEmail }) => {
      const recieverEmail =
        conversation.userOne === senderEmail
          ? conversation.userTwo
          : senderEmail;

      setConversation({ ...conversation, emailOfReciever: recieverEmail });

      axios.get('/messages/' + conversation.id).then((response) => {
        setMessages(response.data);
      });
    });
  }, []);

  return (
    <>
      <div className="d-flex w-100 shadow p-2">
        {onlineUsers.map((user, index: number) => (
          <UserBubble key={index} user={user} />
        ))}
      </div>
      <Conversation conversation={conversation} />
      <Message
        openConversationID={conversation.id}
        importedMessages={messages}
      />
    </>
  );
};

export default MainPage;
