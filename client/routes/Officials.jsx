import React, { useContext } from 'react';

import { Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

import { SessionContext } from '../contexts/Session.jsx';

const Profile = () => {
  let { officialName } = useParams();

  return (
    <h3>You selected {officialName}.</h3>
  );
};

const Officials = () => {
  const { path, url } = useRouteMatch();
  const { session } = useContext(SessionContext);

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <Link to={'/elections'}>Upcoming Elections</Link>
          <h2>Your Elected Officials ({session.address})</h2>
          <Link to={`${url}/MitchMcConnel`}>Mitch McConnel</Link>
        </Route>
        <Route path={`${path}/:officialName`}>
          <Profile />
        </Route>
      </Switch>
    </div>
  );
};

export default Officials;