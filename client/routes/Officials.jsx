import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  withRouter,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../components/style/device';
import Session from '../Session.js';
import Official from '../components/Official.jsx';
import Logo from '../components/Logo.jsx';
import OfficialDetails from '../components/OfficialDetails.jsx';
import { access } from '../util';
import { WaveLoading } from 'react-loadingg';
import colors from '../components/style/colors';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 10px;
`;

ButtonWrapper.displayName = 'ButtonsWrapper';

const LinkWrapper = styled.div`
  a {
    display: flex;
    justify-content: flex-end;
    color: blue;
    text-decoration: none;
  }
`;
LinkWrapper.displayName = 'LinkWrapper';

const ElectionsButton = styled.button`
  outline: none;
  width: 100px;
  padding: 5px 0px 5px 0px;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background-color: ${colors.red};
  color: white;
  &:active {
    box-shadow: inset 0px 0px 20px 0px #005276;
  }
  &:hover {
    background-color: ${colors.hoverBlue};
  }
`;
ElectionsButton.displayName = 'ElectionsButton';

const ElectionLink = withRouter((props) => {
  const [elections, setElections] = useState(null);

  useEffect(() => {
    Session.getElections()
      .then((data) => setElections(data))
      .catch((err) => setElections(undefined));
  }, []);

  const linkTo = {
    pathname: '/elections',
    state: elections,
  };

  return (
    <ButtonWrapper>
      <LinkWrapper>
        <ElectionsButton onClick={props.history.goBack}>Back</ElectionsButton>
      </LinkWrapper>
      {elections ? (
        <LinkWrapper>
          <Link to={linkTo}>
            <ElectionsButton>Elections</ElectionsButton>
          </Link>
        </LinkWrapper>
      ) : null}
    </ButtonWrapper>
  );
});

const Grid = (props) => {
  let { id } = useParams();

  const OfficialsHeader = styled.h2`
    display: flex;
    justify-content: center;
    color: ${colors.black};
    font-size: 2.2em;
    margin-bottom: 0px;
  `;
  OfficialsHeader.displayName = 'OfficialsHeader';

  const OfficialsWrapper = styled.div`
    margin-top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    @media ${device.laptop} {
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
    }
  `;
  OfficialsWrapper.displayName = 'OfficialsWrapper';

  const [data, setData] = useState(null);

  useEffect(() => {
    Session.getOfficals()
      .then((data) =>
        setTimeout(() => {
          setData(data);
        }, 650),
      )
      .catch((err) => setData(undefined));
  }, []);

  if (data === null) {
    return <WaveLoading size="large" color="#0052a5" />;
  }

  const officials = data.officials;
  const state = access(data).normalizedInput.state('');

  if (!officials || !officials.length) {
    return <h1>An error occurred.</h1>;
  }

  if (id !== undefined) {
    return (
      <OfficialsWrapper>
        <OfficialDetails
          {...officials[id]}
          key={`official${id}`}
          state={state}
        />
      </OfficialsWrapper>
    );
  }

  const children = officials
    .map((props, id) => (
      <Official {...props} key={`official${id}`} officialId={id} />
    ))
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
        <Route path={`${path}/:id`}>
          <ElectionLink address={Session.address} details={true} />
          <Grid officials={props.location.state} />
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(Officials);
