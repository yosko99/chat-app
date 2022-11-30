import React, { FC, useContext, useState } from 'react';

import { Alert, Button, Form } from 'react-bootstrap';

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

  return (
    <div>
      {conversation.emailOfReciever === undefined
        ? (
        <Alert className="text-center">Select a conversation</Alert>
          )
        : (
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
              Send message to {conversation.emailOfReciever}
          </Button>
        </Form.Group>
          )}
    </div>
  );
};

export default Conversation;
