import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Session from '../Session.js';
import { device } from '../components/style/device';

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30vh;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: red;
  color: white;
  padding: 5vh 5vh;
  @media: ${device.tablet} {
    justify-content: start;
  }
`;

const Logo = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 2em;
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
    <div>
      <LogoWrapper>
        <Logo>Congre$$</Logo>
      </LogoWrapper>
      <SearchWrapper>
        <form onSubmit={search}>
          <div>{typeof searching === 'string' ? searching : null}</div>
          <input name="address" type="text"></input>
          <button type="submit">{searching === true ? '...' : 'search'}</button>
        </form>
      </SearchWrapper>
    </div>
  );
};

export default withRouter(Portal);
