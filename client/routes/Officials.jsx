import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import Session from '../Session.js';
import Official from '../components/Official.jsx';
import Logo from '../components/Logo.jsx';

const ElectionLink = (props) => {
  const [elections, setElections] = useState(null);

  useEffect(() => {
    Session.getElections()
      .then((data) => setElections(data))
      .catch((err) => setElections(undefined));
  }, []);

  if (!elections) {
    return null;
  }

  const linkTo = {
    pathname: '/elections',
    state: elections,
  };

  return <Link to={linkTo}>Upcoming Elections near {Session.address}</Link>;
};

const Grid = (props) => {
  const [officials, setOfficials] = useState(null);

  useEffect(() => {
    Session.getOfficals()
      .then((data) => setOfficials(data))
      .catch((err) => setOfficials(undefined));
  }, []);

  if (officials === null) {
    return <h1>Loading...</h1>;
  }

  if (!officials || !officials.length) {
    return <h1>An error occurred.</h1>;
  }

  const children = officials.map((props, i) => (
    <Official key={`official${i}`} {...props} />
  ));

  return (
    <div>
      <h2>Your Elected Officials</h2>
      {children}
    </div>
  );
};

const Profile = (props) => {
  return <h3>You selected {props.name}.</h3>;
};

const Officials = (props) => {
  const { path } = useRouteMatch();

  return (
    <div>
      <Logo />
      <Switch>
        <Route exact path={path}>
          <ElectionLink address={Session.address} />
          <Grid officials={props.location.state} />
        </Route>
        <Route path={`${path}/:officialName`}>
          <Profile {...props.location.state} />
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(Officials);
