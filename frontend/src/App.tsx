import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import GlobalCSS from './styles/global.css';

function App () {
  return (
    <BrowserRouter>
      <GlobalCSS />
    </BrowserRouter>
  );
}

export default App;
