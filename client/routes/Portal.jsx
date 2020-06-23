import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components'; 
import Session from '../Session.js';
import { device } from '../components/style/device';

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #e0162b;
  color: white;
  padding: 5vh 5vh;
  @media ${device.tablet} {
    justify-content: start;
  }
`;

const Logo = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 2.5em;
  @media ${device.tablet} {
    font-size: 2.5em;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7.5vh;
`;

const SearchInput = styled.input`
  width: 75vw;
  height: 2em;
  font-size: 1.2em;
  padding: 10px 10px 10px 26px;
  border-radius: 10px;
  border: none;
  margin-top: 3vh;
`;

const SubmitButton = styled.button`
  width: 75vw;
  box-sizing: content-box;
  margin-top: 10px;
  padding: 20px 18px 20px 18px;
  background-color: #0052a5;
  color: white;
  font-size: 1.1em;
  font-weight: bold;
  border-radius: 10px;
  border: none;
`;

const Explanation = styled.p`
  font-family: 'Yeseva One', cursive;
  color: white;
  font-size: 2em;
`;

const Portal = (props) => {
  const [searching, setSearching] = useState(null);

  const search = (ev) => {
    ev.preventDefault();

    const address = ev.target.elements.address.value;

    setSearching(true);
    Session.initialize(address)
      .then((data) => {
        setSearching(false);
        props.history.push('/officials');
      })
      .catch((err) => {
        setSearching("Sorry, that address doesn't seem to be valid.")
      });
  };

  return (
    <div>
      <LogoWrapper>
        <Logo>Congre$$</Logo>
      </LogoWrapper>
      <StyledForm onSubmit={search}>
        {/* <Explanation>
          Enter your address to search for representatives
        </Explanation> */}
        <div>{typeof searching === 'string' ? searching : null}</div>
        <SearchInput
          name="address"
          type="text"
          placeholder="Enter your address..."
        ></SearchInput>
        <SubmitButton type="submit">
          {searching === true ? '...' : 'Search for my Representatives'}
        </SubmitButton>
      </StyledForm>
    </div>
  );
};

export default withRouter(Portal);
