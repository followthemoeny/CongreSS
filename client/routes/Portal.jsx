import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../components/style/device';
import Logo from '../components/Logo.jsx';
import Session from '../Session.js';
import { WaveLoading } from 'react-loadingg';
import colors from '../components/style/colors';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7.5vh;
`;

const SearchInput = styled.input`
  outline: none;
  width: 75vw;
  height: 2em;
  font-size: 1.2em;
  padding: 10px 10px 10px 26px;
  border-radius: 10px;
  border: none;
  margin-top: 3vh;
  &:focus {
    border: 1px solid ${colors.blue};
    padding: 10px 10px 8px 26px;
  }
`;

const SubmitButton = styled.button`
  outline: none;
  width: 75vw;
  box-sizing: content-box;
  margin-top: 10px;
  padding: 20px 18px 20px 18px;
  background-color: ${colors.blue};
  color: white;
  font-size: 1.1em;
  font-weight: bold;
  border-radius: 10px;
  border: none;
  &:hover {
    background-color: ${colors.blue};
  }
  &:active {
    box-shadow: inset 0px 0px 20px 0px #005276;
  }
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
        // setTimeout(() => {
        //   setSearching(false);
        //   props.history.push('/officials');
        // }, 650);
        setSearching(false);
        props.history.push('/officials');
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setSearching("Sorry, that address doesn't seem to be valid.");
        }, 500);
      });
  };

  return (
    <div>
      <Logo />
      <StyledForm onSubmit={search} autoComplete={'off'}>
        <div>{typeof searching === 'string' ? searching : null}</div>
        {searching !== true && (
          <SearchInput
            name="address"
            type="text"
            placeholder="123 Main St, NY, NY, 10025"
          ></SearchInput>
        )}
        {searching === true ? (
          <WaveLoading size="large" color="#0052a5" />
        ) : (
          <SubmitButton type="submit">Search for my Representatives</SubmitButton>
        )}
      </StyledForm>
    </div>
  );
};

export default withRouter(Portal);
