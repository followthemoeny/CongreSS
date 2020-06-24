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

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10px;
`;

const Picture = styled.img`
  object-fit: cover;
  max-width: 300px;
  min-width: 300px;
  max-height: 300px;
  min-height: 300px;
  border-radius: 5% 5% 0 0;
`;

const Name = styled.h2`
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

const Position = styled.h3`
  padding: 0px 0px 5px 0px;
  margin: 0;
`;

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

const Official = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  console.log('offical data', props);
  const websiteUrl = access(props).urls[0](null);
  const phoneNumber = access(props).phones[0](null);
  const address = access(props).address[0]({});
  const { name, party, photoUrl, position } = props;

  const details = showDetails ? (
    <>
      <div>
        <b>address:</b> {address.line1}
      </div>
      <div>
        <b>phone:</b> {phoneNumber}
      </div>
      <Finances name={name} state={state} />
    </>
  ) : null;
  return (
    <CardWrapper>
      <InfoWrapper>
        <Name>{name}</Name>
        <Position>{position}</Position>
        {photoUrl ? (
          <Picture
            src={photoUrl}
            onError={(e) => {
              e.target.style.display = 'none';
              photoUrl = null;
            }}
          />
        ) : null}
        <div>
          <Link to={`/officials/${props.id}`}>
            <MoreInfoButton
              rounded={photoUrl}
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Less' : 'More'} Detail
            </MoreInfoButton>
          </Link>
          {details}
        </div>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default Official;
