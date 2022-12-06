import React from 'react';

const classListArray = ['shadow-lg', 'border-4', 'bg-light'];

export const showSelectedUser = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  const { id: selectedID } = e.target as HTMLImageElement;

  const userConversations = document.querySelectorAll('.user-converastion');

  userConversations.forEach((conversation) => {
    if (conversation.id === selectedID) {
      conversation.classList.add(...classListArray);
    } else {
      conversation.classList.remove(...classListArray);
    }
  });
};
