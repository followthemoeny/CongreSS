import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { access } from '../util';
import { device } from '../components/style/device';
import Finances from './Finances.jsx';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 30px 40px 30px;
  padding-top: 20px;
  padding: 10px;
  max-width: 80vw;
  min-width: 80vw;
  border-radius: 4px;
  @media ${device.laptop} {
    max-width: 100px;
    min-width: 25vw;
  }
  @media ${device.desktop} {
    min-width: 15vw;
  }
`;
CardWrapper.displayName = 'CardWrapper';

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
InfoWrapper.displayName = 'InfoWrapper';

const Picture = styled.img`
  object-fit: cover;
  max-width: 300px;
  min-width: 300px;
  max-height: 300px;
  min-height: 300px;
  border-radius: 5% 5% 0 0;
`;
Picture.displayName = 'Picture';

const Name = styled.h2`
  font-weight: bold;
  margin: 0;
  margin-bottom: 5px;
  padding: 0;
`;
Name.displayName = 'Name';

const Position = styled.h3`
  padding: 0px 0px 5px 0px;
  margin: 0;
  display: flex;
  text-align: center;
`;
Position.displayName = 'Position';

const MoreInfoButton = styled.button`
  width: 300px;
  padding: 20px 18px 20px 18px;
  margin-top: 0px;
  font-size: 1.1em;
  font-weight: bold;
  border: none;
  border-radius: ${(props) => (props.rounded ? '0 0 10px 10px;' : '10px;')}
  background-color: #0052a5;
  color: white;
`;
MoreInfoButton.displayName = 'MoreInfoButton';

const Official = (props) => {
  console.log('offical data', props);
  const websiteUrl = access(props).urls[0](null);
  const phoneNumber = access(props).phones[0](null);
  const address = access(props).address[0].line1(null);
  const { name, party, photoUrl, position, details } = props;

  return (
    <CardWrapper>
      <InfoWrapper>
        <Name>{name}</Name>
        <Position>{position}</Position>
        {photoUrl ? (
          <Picture
            src={photoUrl || '../assets/noImage.png'}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : null}
        <div>
          <Link to={`/officials/${props.officialId}`}>
            <MoreInfoButton rounded={photoUrl}>More Details </MoreInfoButton>
          </Link>
          {details}
        </div>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default Official;
