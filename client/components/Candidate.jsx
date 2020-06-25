import React, { useState, useEffect } from 'react';
import { device } from '../components/style/device';
import colors from '../components/style/colors';
import styled from 'styled-components';
import Finances from './Finances.jsx';

const Candidate = (props) => {
  const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
     margin-top: 10px;
    // padding: 10px;
    // max-width: 80vw;
    // min-width: 80vw;
    // border-radius: 4px;
    // @media ${device.laptop} {
    //   max-width: 100px;
    //   min-width: 30vw;
    }
  `;

  const Name = styled.h2`
    font-weight: bold;
    margin: 0;
    margin-bottom: 5px;
    padding: 0;
  `;

  const Party = styled.h3`
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
  CardWrapper.displayName = 'CardWrapper';

  const [showFinances, setShowFinances] = useState(false);

  const { name, party, state } = props;

  return (
    <CardWrapper>
      <Name>{name}</Name>
      <Party>{party}</Party>
      <div>
        <MoreInfoButton onClick={() => setShowFinances(!showFinances)}>
          {showFinances ? 'Hide' : 'Show'} Finances
        </MoreInfoButton>
        {showFinances ? <Finances name={name} state={state} /> : null}
      </div>
    </CardWrapper>
  );
};

export default Candidate;
