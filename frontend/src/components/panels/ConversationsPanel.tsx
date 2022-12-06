import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import { SocketContext } from '../../context/SocketContext';
import { showSelectedUser } from '../../functions/showSelectedUser';
import { ConversationType } from '../../types/ConversationType';
import { UserType } from '../../types/UserType';
import UserBubble from '../UserBubble';

const ConversationsPanel = () => {
  const [conversationUsers, setConversationUsers] = useState<UserType[]>([]);
  const socket = useContext(SocketContext);

  const initConversations = () => {
    axios
      .get('/conversations', {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then((response) => {
        const requests = response.data.map((conversation: ConversationType) =>
          axios.get(`/users/${conversation.recieverEmail}`)
        );

        axios.all([...requests]).then((response) => {
          const userData = response.map((user) => user.data);
          setConversationUsers(userData);
        });
      });
  };

  useEffect(() => {
    initConversations();

    socket.on('conversation-open', () => {
      initConversations();
    });
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    user: UserType
  ) => {
    socket.emit('conversation', {
      reciever: user,
      token: localStorage.getItem('token')
    });

    showSelectedUser(e);
  };

  return (
    <div>
      {conversationUsers.length === 0
        ? (
        <p className='text-center mt-3'>No converastions to show currently</p>
          )
        : (
            conversationUsers.map((user, index: number) => (
          <div
            key={index}
            onClick={(e) => handleClick(e, user)}
            id={user.id}
            className="d-flex border my-2 user-converastion"
          >
            <UserBubble user={user} />
            <div className="d-flex justify-content-center align-items-center">
              <p className="m-0 p-0">{user.username}</p>
            </div>
          </div>
            ))
          )}
    </div>
  );
};

export default ConversationsPanel;
