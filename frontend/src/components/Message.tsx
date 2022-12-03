import React, { FC } from 'react';

import { MessageType } from '../types/MessageType';

interface Props {
  emailOfReciever: string;
  message: MessageType;
}

const Message: FC<Props> = ({ emailOfReciever, message }) => {
  return (
    <>
      {message.sentBy !== emailOfReciever
        ? (
        <div className="d-flex justify-content-end my-1">
          <div className="bg-info mx-4 badge fs-4 p-3 badge-pill">
            <p className='m-0'>{message.message}</p>
          </div>
          <br />
        </div>
          )
        : (
        <div className="d-flex my-1">
          <div className="bg-success mx-4 badge fs-4 p-3 badge-pill">
            <p className='m-0'>{message.message}</p>
          </div>
        </div>
          )}
    </>
  );
};

export default Message;
