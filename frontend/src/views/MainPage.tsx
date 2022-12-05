import React, { useContext, useEffect } from 'react';

import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Conversation from '../components/Conversation';
import MessagesPanel from '../components/panels/MessagesPanel';
import UserBubble from '../components/UserBubble';
import { OnlineUsersContext } from '../context/OnlineUsersContext';
import useOnConnectedSocket from '../hooks/sockets/useOnConnectedSocket';
import useOnConversationOpenSocket from '../hooks/sockets/useOnConversationOpenSocket';
import useOnOnlineSocket from '../hooks/sockets/useOnOnlineSocket';

const MainPage = () => {
  const onlineUsersContext = useContext(OnlineUsersContext);
  const navigate = useNavigate();

  useOnConnectedSocket();
  useOnConversationOpenSocket();
  useOnOnlineSocket();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <div className="d-flex w-100 shadow p-2">
        {onlineUsersContext!.onlineUsers.map((user, index: number) => (
          <UserBubble key={index} user={user} />
        ))}
      </div>
      <Row className="m-0 p-0">
        <Col lg={2}>{/* <ConversationsPanel /> */}</Col>
        <Col lg={10}>
          <MessagesPanel />
          <Conversation />
        </Col>
      </Row>
    </>
  );
};

export default MainPage;
