import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../components/style/device';
import Session from '../Session.js';
import Official from '../components/Official.jsx';
import Logo from '../components/Logo.jsx';

const ElectionLink = (props) => {
  const LinkWrapper = styled.div`
    padding-top: 5px;
    margin-right: 20px;
    a {
      display: flex;
      justify-content: flex-end;
      width: 100vw;
      color: blue;
      text-decoration: none;
      margin-right: 5px;
    }
  `;
  const ElectionsButton = styled.button`
    width: 100px;
    padding: 10px 0px 10px 0px;
    margin-top: 5px;
    font-size: 1em;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    background-color: #0052a5;
    color: white;
  `;
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

  return (
    <LinkWrapper>
      <Link to={linkTo}>
        <ElectionsButton>Upcoming Elections</ElectionsButton>
      </Link>
    </LinkWrapper>
  );
};

const Grid = (props) => {
  const OfficialsHeader = styled.h2`
    display: flex;
    justify-content: center;
    color: #00100b;
    font-size: 2.2em;
    margin-bottom: 0px;
    font-family: -apple-system;
  `;
  const OfficialsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    font-family: -apple-system;
    @media ${device.laptop} {
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
    }
  `;

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

  const children = officials
    .map((props, i) => <Official key={`official${i}`} {...props} />)
    .reverse();

  return (
    <div>
      <OfficialsHeader>Your Elected Officials</OfficialsHeader>
      <OfficialsWrapper>{children}</OfficialsWrapper>
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
