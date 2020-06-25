import React, { useState, useEffect } from 'react';
import { device } from '../components/style/device';
import styled from 'styled-components';
import Finances from './Finances.jsx';

const Candidate = (props) => {
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
  CardWrapper.displayName = 'CardWrapper';
  console.log('candidate data', props);

  const [showFinances, setShowFinances] = useState(false);

  console.log('candidate data', props);
  const { name, party, state } = props;

  return (
    <div>
      <div>{name}</div>
      <div>{party}</div>
      <div>
        <button onClick={() => setShowFinances(!showFinances)}>
          {showFinances ? 'hide' : 'show'} finances
        </button>
        {showFinances ? <Finances name={name} state={state} /> : null}
      </div>
    </div>
  );
};

export default Candidate;
