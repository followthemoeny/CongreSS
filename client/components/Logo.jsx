import React from 'react';
import styled from 'styled-components';
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

const LogoContent = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 2.5em;
  @media ${device.tablet} {
    font-size: 2.5em;
  }
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoContent>Congre$$</LogoContent>
    </LogoWrapper>
  );
};

export default Logo;
