import React, { useEffect } from 'react';

import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Conversation from '../components/Conversation';
import MessagesPanel from '../components/panels/MessagesPanel';
import UserBubble from '../components/UserBubble';
import useOnConnectedSocket from '../hooks/sockets/useOnConnectedSocket';
import useOnConversationOpenSocket from '../hooks/sockets/useOnConversationOpenSocket';
import useOnOnlineSocket from '../hooks/sockets/useOnOnlineSocket';

const MainPage = () => {
  const navigate = useNavigate();
  useOnConnectedSocket();

  const { conversation } = useOnConversationOpenSocket();
  const { onlineUsers } = useOnOnlineSocket();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <div className="d-flex w-100 shadow p-2">
        {onlineUsers.map((user, index: number) => (
          <UserBubble key={index} user={user} />
        ))}
      </div>
      <Row className="m-0 p-0">
        <Col lg={2}>{/* <ConversationsPanel /> */}</Col>
        <Col lg={10}>
          <MessagesPanel conversation={conversation} />
          <Conversation conversation={conversation} />
        </Col>
      </Row>
    </>
  );
};

export default MainPage;
