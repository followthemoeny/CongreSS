import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

import { SessionProvider } from './contexts/Session.js';

if (module && module.hot) {
  module.hot.accept()
}

render(
  (
    <SessionProvider>
      <App/>
    </SessionProvider>
  ),
  document.getElementById('root')
);
