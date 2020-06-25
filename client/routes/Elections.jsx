import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import Session from '../Session.js';
import Election from '../components/Election.jsx';
import Logo from '../components/Logo.jsx';
import { device } from '../components/style/device';
import { WaveLoading } from 'react-loadingg';
import colors from '../components/style/colors';

const ElectionLink = (props) => {
  const ButtonsWrapepr = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 10px;
  `;
  const LinkWrapper = styled.div`
    a {
      display: flex;
      justify-content: flex-end;
      color: blue;
      text-decoration: none;
    }
  `;
  const ElectionsButton = styled.button`
    width: 100px;
    padding: 5px 0px 5px 0px;
    font-size: 1em;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    background-color: ${colors.red};
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
    <ButtonsWrapepr>
      <LinkWrapper>
        <Link to="/officials">
          <ElectionsButton>Officials</ElectionsButton>
        </Link>
      </LinkWrapper>
    </ButtonsWrapepr> 
  );
};

const Elections = (props) => {
  const [elections, setElections] = useState(null);

  useEffect(() => {
    Session.getElections()
      .then((data) =>
        setTimeout(() => {
          setElections(data);
        }, 650)
      )
      .catch((err) => setElections(undefined));
  }, []);

  if (elections === null) {
    return <WaveLoading size="large" color="#0052a5" />;
  }

  if (!elections.length) {
    return <ElectionsHeader>No upcoming elections near you</ElectionsHeader>;
  }

  if (elections === undefined) {
    return <ElectionsHeader>An error occurred.</ElectionsHeader>;
  }

  const ElectionsHeader = styled.h2`
    display: flex;
    justify-content: center;
    color: ${colors.blue};
    font-size: 2em;
    margin-bottom: 0px;
  `;
  const ElectionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    margin: 5vw;
    @media ${device.laptop} {
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
    }
  `;

  const children = elections.map((props, i) => <Election key={`election${i}`} {...props} />);

  return (
    <div>
      <Logo />
      <ElectionLink />
      <ElectionsHeader>Elections near you:</ElectionsHeader>
      <ElectionsWrapper>{children}</ElectionsWrapper>
    </div>
  );
};

export default withRouter(Elections);
