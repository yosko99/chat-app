import React, { FC } from 'react';

import useOnMessageSocket from '../hooks/sockets/useOnMessageSocket';
import { ConversationType } from '../types/ConversationType';

interface Props {
  conversation: ConversationType;
}

const Message: FC<Props> = ({ conversation }) => {
  const { messages } = useOnMessageSocket(conversation.id);

  return (
    <>
      {messages.map((message, index: number) =>
        message.sentBy !== conversation.emailOfReciever
          ? (
          <div key={index} className="d-flex justify-content-end my-2">
            <div className="bg-info text-left p-2 w-25 rounded">
              <p>{message.message}</p>
            </div>
            <br />
          </div>
            )
          : (
          <div key={index} className="d-flex my-2">
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
