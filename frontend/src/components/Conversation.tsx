import React, { FC, useContext, useEffect, useState } from 'react';

import { Button, Form } from 'react-bootstrap';

import { SocketContext } from '../context/SocketContext';
import { ConversationType } from '../types/ConversationType';

interface Props {
  conversation: ConversationType;
}

const Conversation: FC<Props> = ({ conversation }) => {
  const [message, setMessage] = useState<string>('');
  const socket = useContext(SocketContext);

  const handleMessageSend = () => {
    socket.emit('send-message', {
      conversation,
      token: localStorage.getItem('token'),
      message
    });
    setMessage('');
  };

  if (conversation === undefined) {
    return <h1>Select conversation</h1>;
  }

  return (
    <div>
      <Form.Group className="mb-3 d-flex">
        <Form.Control
          type="text"
          className="border"
          required
          name="message"
          placeholder="Type a message"
          minLength={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" onClick={() => handleMessageSend()}>
          Send to {conversation.id}
        </Button>
      </Form.Group>
    </div>
  );
};

export default Conversation;
