import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Session from '../Session.js';

const PortalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: red;
`;

const Logo = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 2em;
  margin-top: 20px;
  background-color: red;
  color: white;
`;

const Portal = (props) => {
  const [searching, setSearching] = useState(null);

  const search = (ev) => {
    ev.preventDefault();

    const address = ev.target.elements.address.value;

    setSearching(true);
    Session.createSession(address)
      .then((data) => {
        setSearching(false);
        props.history.push('/officials');
      })
      .catch((err) => {
        setSearching("Sorry, that address doesn't seem to be valid");
      });
  };

  return (
    <PortalWrapper>
      <Logo>Congre$$</Logo>
      <form onSubmit={search}>
        <div>{typeof searching === 'string' ? searching : null}</div>
        <input name="address" type="text"></input>
        <button type="submit">{searching === true ? '...' : 'search'}</button>
      </form>
    </PortalWrapper>
  );
};

export default withRouter(Portal);
