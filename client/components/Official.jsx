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
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

const Picture = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

const Official = (props) => {
  console.log('offical data', props);

  const [showDetails, setShowDetails] = useState(false);

  const linkTo = {
    pathname: `/officials/${props.name.replace(/ /g, '-')}`,
    state: props,
  };

  const details = showDetails ? (
    <>
      <div>
        <b>address:</b> {props.address[0].line1}
      </div>
      <div>
        <b>phone:</b> {props.phones[0]}
      </div>
    </>
  ) : null;

  return (
    <CardWrapper>
      <Picture src={props.photoUrl || 'client/assets/noImage.png'} />
      <InfoWrapper>
        <div>{props.name}</div>
        <div>{props.party}</div>
        <div>
          <a href={props.urls[0]}>{props.urls[0]}</a>
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
