<<<<<<< HEAD
import React from 'react';
=======
import React, { useContext } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ProtectedRoute from './util/ProtectedRoute.jsx';
>>>>>>> fa83a631f7f5c32aa5d2e7ea9433f2a7d87c6775

import Session from './Session.js';

import Portal from './routes/Portal.jsx';
import Officials from './routes/Officials.jsx';
import Elections from './routes/Elections.jsx';

const Background = styled.div`
  height: 100vh;
  background-color: #add8e6;
`;
const App = () => {
<<<<<<< HEAD
  return <div>greetings</div>;
};

=======
  const validate = () => {
    if (!Session.address) {
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

>>>>>>> fa83a631f7f5c32aa5d2e7ea9433f2a7d87c6775
export default App;
