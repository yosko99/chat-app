import React, { FC, useContext } from 'react';

import { Image } from 'react-bootstrap';

import { SocketContext } from '../context/SocketContext';
import OnlineBubble from '../styles/OnlineBubble.styled';
import { UserType } from '../types/UserType';

interface Props {
  user: UserType;
}

const UserBubble: FC<Props> = ({ user }) => {
  const socket = useContext(SocketContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    socket.emit('conversation', {
      reciever: user,
      token: localStorage.getItem('token')
    });
  };

  return (
    <div
      className="d-flex mx-1"
      role={'button'}
      onClick={(e) => handleClick(e)}
    >
      <Image
        src={`/public/${user.img}`}
        fluid
        style={{
          borderRadius: '50%',
          width: '50px',
          height: '50px'
        }}
      />
      <OnlineBubble isOnline={user.online} />
    </div>
  );
};

export default UserBubble;
