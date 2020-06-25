import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { access } from '../util';
import { device } from '../components/style/device';
import colors from './style/colors';
import Finances from '../components/Finances.jsx';
import img from '../assets/noImage.png';

const mediaIcons = {
  Facebook: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
    </svg>
  ),
  Twitter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z" />
    </svg>
  ),
  YouTube: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M10 9.333l5.333 2.662-5.333 2.672v-5.334zm14-4.333v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5zm-4 7c-.02-4.123-.323-5.7-2.923-5.877-2.403-.164-7.754-.163-10.153 0-2.598.177-2.904 1.747-2.924 5.877.02 4.123.323 5.7 2.923 5.877 2.399.163 7.75.164 10.153 0 2.598-.177 2.904-1.747 2.924-5.877z" />
    </svg>
  ),
  emails: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z" />
    </svg>
  ),
  phones: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.445 17.827c-3.684 1.684-9.401-9.43-5.8-11.308l1.053-.519 1.746 3.409-1.042.513c-1.095.587 1.185 5.04 2.305 4.497l1.032-.505 1.76 3.397-1.054.516z" />
    </svg>
  ),
  urls: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z" />
    </svg>
  ),
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 30px 40px 30px;
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
`;

const Picture = styled.img`
  object-fit: cover;
  max-width: 300px;
  min-width: 300px;
  max-height: 300px;
  min-height: 300px;
  border-radius: 5%;
  margin-top: 10px;
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
  background-color: ${colors.blue};
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
  background-color: ${colors.red};
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
  padding: 0px;
  margin: 0px;
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
  font-weight: bold;
`;

const OfficialDetails = (props) => {
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

  const outlets = [];

  if (channels) {
    const track = {};
    channels.forEach((el, index) => {
      if (!track[el.type]) {
        track[el.type] = true;
        outlets.push(
          <li key={`${el.type}${index}`}>
            <ExternalAnchor
              href={`http://${el.type}.com/${el.id}`}
              target="_blank"
            >
              {mediaIcons[el.type]}
            </ExternalAnchor>
          </li>,
        );
      }
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
        {/* <ContactWrapper>
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
          <span>{urls ? <OfficialContact href={urls[0]}>Website</OfficialContact> : null}</span>
        </ContactWrapper> */}
        <Media>
          <li key="emails">
            {emails ? (
              <ExternalAnchor href={'mailto:' + emails[0]} target="_blank">
                {mediaIcons.emails}
              </ExternalAnchor>
            ) : null}
          </li>
          <li key="phones">
            {phones ? (
              <ExternalAnchor href={'tel:' + phones[0]} target="_blank">
                {mediaIcons.phones}
              </ExternalAnchor>
            ) : null}
          </li>
          <li keys="urls">
            {urls ? (
              <ExternalAnchor href={urls[0]} target="_blank">
                {mediaIcons.urls}
              </ExternalAnchor>
            ) : null}
          </li>
          {outlets}
        </Media>
        <Finances name={name} state={state} />
      </InfoWrapper>
    </CardWrapper>
  );
};
export default OfficialDetails;
