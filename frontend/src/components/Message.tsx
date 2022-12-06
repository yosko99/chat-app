import React, { FC } from 'react';

import { MessageType } from '../types/MessageType';

interface Props {
  emailOfReciever: string;
  message: MessageType;
}

const Message: FC<Props> = ({ emailOfReciever, message }) => {
  return (
    <>
      <div
        className={`d-flex my-1 ${
          message.sentBy !== emailOfReciever ? 'justify-content-end' : ''
        }`}
      >
        <div
          className={`${
            message.sentBy !== emailOfReciever ? 'bg-info' : 'bg-success'
          } mx-4 badge fs-4 p-3 badge-pill`}
          style={{ maxWidth: '50%' }}
        >
          <p className="m-0" style={{ whiteSpace: 'normal' }}>
            {message.message}
          </p>
        </div>
        <br />
      </div>
    </>
  );
};

export default Message;
