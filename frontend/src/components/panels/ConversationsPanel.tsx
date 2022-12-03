import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { ConversationType } from '../../types/ConversationType';

const ConversationsPanel = () => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    axios
      .get('/conversations', {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then((response) => {});
  }, []);

  return <div>ConversationsPanel</div>;
};

export default ConversationsPanel;
