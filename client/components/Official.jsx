import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../components/style/device';

const CardWrapper = styled.div`
  display: flex;
  background-color: white;
  margin: 15px 15px 15px 15px;
  padding: 10px;
  max-width: 80vw;
  min-width: 80vw;
  border-radius: 4px;
  box-shadow: 2px 2px 5px -3px #000000;
  @media ${device.laptop} {
    max-width: 100px;
    min-width: 30vw;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

const Picture = styled.img`
  max-width: 100px;
  min-width: 75px;
  max-height: 100px;
  min-height: 100px;
`;

const Official = (props) => {
  console.log('offical data', props);

  const { name, party, photoUrl } = props;
  const websiteUrl = props.urls ? props.urls[0] : null;
  const phoneNumber = props.phones ? props.phones[0] : null;
  const address = props.address ? props.address[0] ? props.address[0].line1 : null : null;

  const [showDetails, setShowDetails] = useState(false);

  const linkTo = {
    pathname: `/officials/${name.replace(/ /g, '-')}`,
    state: props,
  };

  const details = showDetails ? (
    <>
      <div>
        <b>address:</b> {address}
      </div>
      <div>
        <b>phone:</b> {phoneNumber}
      </div>
    </>
  ) : null;

  return (
    <CardWrapper>
      <Picture src={photoUrl || 'client/assets/noImage.png'} />
      <InfoWrapper>
        <div>{name}</div>
        <div>{party}</div>
        <div>
          <a href={websiteUrl}>{websiteUrl}</a>
        </div>
        <div>
          <button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'less' : 'more'} detail
          </button>
          {details}
        </div>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default Official;
