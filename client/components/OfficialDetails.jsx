import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { access } from '../util';
import { device } from '../components/style/device';
import Finances from '../components/Finances.jsx';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 30px 40px 30px;
  padding-top: 20px;
  padding: 10px;
  padding-left: 0px;
  max-width: 80vw;
  min-width: 80vw;
  border-radius: 4px;
  @media ${device.laptop} {
    max-width: 100px;
    min-width: 25vw;
    align-items: center;
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
  border-radius: 5%;
  padding-bottom: 10px;
`;

const Name = styled.h2`
  font-weight: bold;
  margin: 0;
  margin-bottom: 5px;
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

const Party = styled.p`
  padding-top: 0px;
  padding-bottom: 10px;
  margin: 0px 15px;
  font-weight: bold;
`;

Party.displayName = 'Party';

const ContactWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  font-size: 1em;
  font-family: Arial;
  font-weight: bold;
  padding-top: 5px;
`;

const OfficialContact = styled.a`
  background-color: #e0162b;
  border-radius: 10px;
  padding: 0.25em 1em 0.25em 1em;
  text-decoration: none;
  color: white;
  border: 1px solid red;
  width: 100px;
`;

const Media = styled.div``;
Media.displayName = 'Media';

const OfficialDetails = (props) => {
  console.log('offical data', props);
  const websiteUrl = access(props).urls[0](null);
  const phoneNumber = access(props).phones[0](null);
  const address = access(props).address[0].line1(null);
  const {
    name,
    party,
    photoUrl,
    position,
    details,
    state,
    channels,
    urls,
    emails,
    phones,
  } = props;

  return (
    <CardWrapper>
      <InfoWrapper>
        <Name>{name}</Name>
        <Position>{position}</Position>
        <Party>{party}</Party>
        {photoUrl ? (
          <Picture
            src={photoUrl}
            onError={(e) => {
              e.target.style.display = 'none';
              photoUrl = null;
            }}
          />
        ) : null}
        <ContactWrapper>
          <span>
            {emails ? (
              <OfficialContact href={'mailto:' + emails[0]}>
                Email
              </OfficialContact>
            ) : null}
          </span>
          <span>
            {phones ? (
              <OfficialContact href={'tel:' + phones[0]}>Call</OfficialContact>
            ) : null}
          </span>
          <span>
            {urls ? (
              <OfficialContact href={urls[0]}>Website</OfficialContact>
            ) : null}
          </span>
        </ContactWrapper>
        <Media></Media>
        <Finances name={name} state={state} />
      </InfoWrapper>
    </CardWrapper>
  );
};
export default OfficialDetails;
