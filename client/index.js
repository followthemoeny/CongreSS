import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

if (module && module.hot) {
  module.hot.accept();
}

render(<App />, document.getElementById('root'));
