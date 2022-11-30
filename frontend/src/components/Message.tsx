import React, { FC, useContext, useEffect, useState } from 'react';

import axios from 'axios';

import { SocketContext } from '../context/SocketContext';
import { MessageType } from '../types/MessageType';

interface Props {
  openConversationID: number;
  importedMessages: MessageType[];
}

const Message: FC<Props> = ({ openConversationID, importedMessages }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('message-recieved', ({ conversationID }) => {
      if (openConversationID === conversationID) {
        axios.get('/messages/' + conversationID).then((response) => {
          setMessages(response.data);
        });
      }
    });
  }, [openConversationID]);

  useEffect(() => {
    setMessages(importedMessages);
  }, [importedMessages]);

  return (
    <>
      {messages.map((message, index: number) => (
        <div className="shadow w-100" key={index}>
          <p>Sender: {message.sentBy}</p>
          <p>{message.message}</p>
        </div>
      ))}
    </>
  );
};

export default Message;
