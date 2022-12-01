import React, { FC, useContext, useEffect, useState } from 'react';

import axios from 'axios';

import { SocketContext } from '../context/SocketContext';
import { ConversationType } from '../types/ConversationType';
import { MessageType } from '../types/MessageType';

interface Props {
  conversation: ConversationType;
  importedMessages: MessageType[];
}

const Message: FC<Props> = ({ conversation, importedMessages }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('message-recieved', ({ conversationID }) => {
      if (conversation.id === conversationID) {
        axios.get('/messages/' + conversationID).then((response) => {
          setMessages(response.data);
        });
      }
    });
  }, [conversation.id]);

  useEffect(() => {
    setMessages(importedMessages);
  }, [importedMessages]);

  return (
    <>
      {messages.map((message, index: number) =>
        message.sentBy === conversation.emailOfReciever
          ? (
          <div key={index} className='d-flex justify-content-end my-2'>
            <div className="bg-info text-left p-2 w-25 rounded">
              <p>{message.message}</p>
            </div>
            <br/>
          </div>
            )
          : (
          <div key={index} className='d-flex my-2'>
            <div className="bg-success text-right p-2 w-25 rounded">
              <p>{message.message}</p>
            </div>
          </div>
            )
      )}
    </>
  );
};

export default Message;
