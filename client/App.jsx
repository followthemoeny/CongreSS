import React, { useContext } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ProtectedRoute from './util/ProtectedRoute.jsx';

import Session from './Session.js';

import Portal from './routes/Portal.jsx';
import Officials from './routes/Officials.jsx';
import Elections from './routes/Elections.jsx';

const Background = styled.div`
  height: 100vh;
  background-color: #add8e6;
`;
const App = () => {
  const validate = () => {
    if (!Session.getAddress()) {
      return '/';
    }
  };

  return (
    <Background>
      <Router>
        <Switch>
          <Route exact path="/">
            <Portal />
          </Route>
          <ProtectedRoute path="/officials" validate={validate}>
            <Officials />
          </ProtectedRoute>
          <ProtectedRoute path="/elections" validate={validate}>
            <Elections />
          </ProtectedRoute>
          <Route>
            <h1>404 Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </Background>
  );
};

export default App;
