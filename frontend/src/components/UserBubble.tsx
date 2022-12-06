import React, { FC, useContext } from 'react';

import { Image } from 'react-bootstrap';

import { SocketContext } from '../context/SocketContext';
import { showSelectedUser } from '../functions/showSelectedUser';
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

    showSelectedUser(e);
  };

  return (
    <div className={'d-flex mx-1'}>
      <Image
        src={`/public/${user.img}`}
        onClick={(e) => handleClick(e)}
        id={user.id}
        fluid
        className="chatBubble"
        role={'button'}
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
