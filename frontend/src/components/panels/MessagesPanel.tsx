import React, { FC, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';

import { ConversationContext } from '../../context/ConversationContext';
import { MessagesContext } from '../../context/MessagesContext';
import { OnlineUsersContext } from '../../context/OnlineUsersContext';
import { SocketContext } from '../../context/SocketContext';
import useOnMessageRecievedSocket from '../../hooks/sockets/useOnMessageRecievedSocket';
import { UserType } from '../../types/UserType';
import Message from '../Message';

const MessagesDiv = styled.div`
  height: 85vh;
  overflow: overlay;
`;

const MessagesPanel: FC = () => {
  const conversationContext = useContext(ConversationContext);
  const onlineUsersContext = useContext(OnlineUsersContext);
  const messagesContext = useContext(MessagesContext);

  const [reciever, setReciever] = useState<UserType>();

  useOnMessageRecievedSocket(conversationContext!.conversation.id);

  const socket = useContext(SocketContext);

  const initRecieverData = () => {
    if (conversationContext!.conversation.recieverEmail !== '') {
      axios
        .get(`/users/${conversationContext!.conversation.recieverEmail}`)
        .then((response) => {
          const lastOnline = new Date(response.data.lastOnline);
          response.data.lastOnline = lastOnline;

          setReciever(response.data as UserType);
        });
    }
  };

  useEffect(() => {
    const messagesDiv = document.getElementById('messages-div');

    messagesDiv!.scrollTop = messagesDiv!.scrollHeight;
  }, [messagesContext!.messages.length]);

  useEffect(() => {
    initRecieverData();

    socket.off('online').on('online', (data) => {
      initRecieverData();
      onlineUsersContext!.setOnlineUsers(data.online);
    });
  }, [conversationContext!.conversation.recieverEmail]);

  return (
    <MessagesDiv id="messages-div" className="d-flex flex-column">
      {reciever !== undefined && (
        <div className="shadow bg-primary w-100 text-white rounded d-flex">
          <Image
            src={`/public/${reciever.img}`}
            className="m-2"
            style={{
              borderRadius: '50%',
              width: '50px',
              height: '50px'
            }}
          />
          <div className="d-flex justify-content-center align-items-center flex-column">
            <p className="m-0">{reciever.username}</p>
            {reciever.online
              ? (
              <div className="text-success">Online</div>
                )
              : (
              <div className="text-muted">
                Last online {reciever.lastOnline.toLocaleDateString('en-US')}-
                {reciever.lastOnline.toLocaleTimeString('en-US')}
              </div>
                )}
          </div>
        </div>
      )}
      {messagesContext!.messages.map((message, index: number) => (
        <Message
          key={index}
          emailOfReciever={
            conversationContext!.conversation.recieverEmail as string
          }
          message={message}
        />
      ))}
    </MessagesDiv>
  );
};

export default MessagesPanel;
