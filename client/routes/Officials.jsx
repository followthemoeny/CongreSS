import React, { useContext, useState, useEffect } from 'react';
import { Switch, Route, Link, useRouteMatch, useParams, withRouter } from "react-router-dom";
import Api from '../util/Api.js';
import { SessionContext } from '../contexts/Session.js';
import Official from '../components/Official.jsx';

const ElectionLink = ({address}) => {
  const [ elections, setElections ] = useState(null);

  useEffect(() => {
    Api.getElections(address)
    .then((data) => setElections(data))
    .catch((err) => setElections(undefined));
  }, []);

  if (!elections) {
    return null;
  }

  const linkTo = { 
    pathname: '/elections', 
    state: elections
  };

  return (
    <Link to={linkTo}>Upcoming Elections near {address}</Link>
  );
};

const Grid = ({officials}) => {
  officials = officials.map((props, i) => 
    <Official key={`official${i}`} {...props} />
  );

  return (
    <div>
      <h2>Your Elected Officials</h2>
      {officials}
    </div>
  );
};

const Profile = (props) => {
  let { officialName } = useParams();

  return (
    <h3>You selected {props.name}.</h3>
  );
};

const Officials = (props) => {
  const { path } = useRouteMatch();

  const { session } = useContext(SessionContext);

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <ElectionLink address={session.address} />
          <Grid officials={props.location.state} />
        </Route>
        <Route path={`${path}/:officialName`}>
          <Profile {...props.location.state}/>
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(Officials);