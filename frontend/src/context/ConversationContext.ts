import React, { createContext } from 'react';

import { ConversationType } from '../types/ConversationType';

interface ConversationContextType {
  conversation: ConversationType;
  setConversation: React.Dispatch<React.SetStateAction<ConversationType>>;
}

export const ConversationContext =
  createContext<ConversationContextType | null>(null);
