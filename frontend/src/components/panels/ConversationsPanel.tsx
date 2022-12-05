import React, { useEffect } from 'react';

import axios from 'axios';

const ConversationsPanel = () => {
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
