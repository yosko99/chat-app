import React, { createContext } from 'react';

import { MessageType } from '../types/MessageType';

interface MessagesContextType {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

export const MessagesContext = createContext<MessagesContextType | null>(null);
