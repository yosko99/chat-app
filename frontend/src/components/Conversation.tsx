import React, { FC, useContext, useState } from 'react';

import { Alert, Button, Form } from 'react-bootstrap';

import { ConversationContext } from '../context/ConversationContext';
import { SocketContext } from '../context/SocketContext';

const Conversation: FC = () => {
  const conversationContext = useContext(ConversationContext);
  const [message, setMessage] = useState<string>('');

  const socket = useContext(SocketContext);

  const handleMessageSend = () => {
    if (message.length !== 0) {
      socket.emit('send-message', {
        conversation: conversationContext!.conversation,
        token: localStorage.getItem('token'),
        message
      });
      setMessage('');
    }
  };

  const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleMessageSend();
    }
  };

  return (
    <div className='mt-5'>
      {conversationContext?.conversation.id === 0
        ? (
        <Alert className="text-center">Select a conversation</Alert>
          )
        : (
        <Form.Group className="mb-3 d-flex">
          <Form.Control
            type="text"
            autoComplete="off"
            className="border"
            name="message"
            maxLength={255}
            placeholder="Type a message"
            value={message}
            onKeyDown={(e) =>
              handleInputChange(e as React.KeyboardEvent<HTMLInputElement>)
            }
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" onClick={() => handleMessageSend()}>
            Send message
          </Button>
        </Form.Group>
          )}
    </div>
  );
};

export default Conversation;
