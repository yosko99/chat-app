import React, { FC } from 'react';

import { Image } from 'react-bootstrap';

import OnlineBubble from '../styles/OnlineBubble.styled';

interface Props {
  imageURL: string;
  online: boolean;
}

const UserBubble: FC<Props> = ({ imageURL, online }) => {
  return (
    <div className="d-flex">
      <Image
        src={`/public/${imageURL}`}
        fluid
        style={{
          borderRadius: '50%',
          width: '50px',
          height: '50px'
        }}
      />
      <OnlineBubble isOnline={online} />
    </div>
  );
};

export default UserBubble;
