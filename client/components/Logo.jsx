import React from 'react';
import styled from 'styled-components';
import { device } from '../components/style/device';

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #e0162b;
  color: white;
  padding: 2vh 2vh;
  border-radius: 0px 0px 10px 10px;
  @media ${device.laptop} {
    justify-content: start;
    padding: 25px 25px;
    border-radius: 0px;
  }
`;

const LogoContent = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 2.5em;
  @media ${device.laptop} {
    font-size: 2.5em;
  }
`;

LogoContent.displayName = 'logoSpan'

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoContent>Congre$$</LogoContent>
    </LogoWrapper>
  );
};

export default Logo;
