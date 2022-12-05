import React, { createContext } from 'react';

import { UserType } from '../types/UserType';

interface OnlineUsersContextType {
  onlineUsers: UserType[];
  setOnlineUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
}

export const OnlineUsersContext = createContext<OnlineUsersContextType | null>(
  null
);
