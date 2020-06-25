import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { access } from '../util';
import { device } from '../components/style/device';
import Finances from '../components/Finances.jsx';
import img from '../assets/noImage.png';

const mediaIcons = {
  Facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
    </svg>
  ),
  Twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z" />
    </svg>
  ),
  YouTube: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M10 9.333l5.333 2.662-5.333 2.672v-5.334zm14-4.333v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5zm-4 7c-.02-4.123-.323-5.7-2.923-5.877-2.403-.164-7.754-.163-10.153 0-2.598.177-2.904 1.747-2.924 5.877.02 4.123.323 5.7 2.923 5.877 2.399.163 7.75.164 10.153 0 2.598-.177 2.904-1.747 2.924-5.877z" />
    </svg>
  ),
};

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

const Media = styled.ul`
  list-style: none;
  display: flex;
  padding: none;
  margin: none;
`;
Media.displayName = 'Media';

const ExternalAnchor = styled.a`
  &:hover {
    opacity: 80%;
  }
  text-decoration: none;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 1em;
`;
ExternalAnchor.displayName = 'ExternalAnchor';

const IdSpan = styled.span`
  margin-left: 1em;
  font-family: -apple-system;
  font-weight: bold;
`;

const OfficialDetails = (props) => {
  console.log('offical data', props);
  const websiteUrl = access(props).urls[0](null);
  const phoneNumber = access(props).phones[0](null);
  const address = access(props).address[0].line1(null);
  const { name, party, photoUrl, position, details, state, channels, urls, emails, phones } = props;

  const outlets = [];
  if (channels) {
    channels.forEach((el) => {
      outlets.push(
        <li>
          <ExternalAnchor href={`http://${el.type}.com/${el.id}`} target="_blank">
            {mediaIcons[el.type]}
          </ExternalAnchor>
        </li>
      );
    });
  }
  return (
    <CardWrapper>
      <InfoWrapper>
        <Name>{name}</Name>
        <Position>{position}</Position>
        <Party>{party}</Party>
        <Picture
          src={photoUrl || img}
          onError={(e) => {
            e.target.src = img;
          }}
        />
        <ContactWrapper>
          <span>
            {emails ? <OfficialContact href={'mailto:' + emails[0]}>Email</OfficialContact> : null}
          </span>
          <span>
            {phones ? <OfficialContact href={'tel:' + phones[0]}>Call</OfficialContact> : null}
          </span>
          <span>{urls ? <OfficialContact href={urls[0]}>Website</OfficialContact> : null}</span>
        </ContactWrapper>
        <Media>{outlets}</Media>
        <Finances name={name} state={state} />
      </InfoWrapper>
    </CardWrapper>
  );
};
export default OfficialDetails;
