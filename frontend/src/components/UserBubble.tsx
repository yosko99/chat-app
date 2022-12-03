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

    const { id: selectedID } = e.target as HTMLImageElement;

    const userBubbles = document.querySelectorAll('.chatBubble');

    userBubbles.forEach((bubble) => {
      if (bubble.id === selectedID) {
        bubble.classList.add('border', 'border-danger', 'border-4');
      } else {
        bubble.classList.remove('border', 'border-danger', 'border-4');
      }
    });
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
