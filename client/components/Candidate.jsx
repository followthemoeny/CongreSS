import React, { useState, useEffect } from 'react';
import { device } from '../components/style/device';
import styled from 'styled-components';

import Session from '../Session.js';

const FinanceData = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    Session.getFinances(props.candidate_id)
      .then((data) => setData(data))
      .catch((err) => setData(undefined));
  }, []);

  console.log('financial data', data);

  if (data === null) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <h1>No financial information available for this candidate.</h1>;
  }

  return (
    <div style={{ border: '1px solid' }}>
      <div>
        <b>total expenditures:</b> {data.expenditures}
      </div>
    </div>
  );
};

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
  console.log('candidate data', props);

  const [showFinances, setShowFinances] = useState(false);

  return (
    <div>
      <div>
        <b>name:</b> {props.name}
      </div>
      <div>
        <b>party:</b> {props.party}
      </div>
      <div>
        <button onClick={() => setShowFinances(!showFinances)}>
          {showFinances ? 'hide' : 'show'} finances
        </button>
        {showFinances ? (
          <FinanceData candidate_id={props.candidate_id} />
        ) : null}
      </div>
    </div>
  );
};

export default Candidate;
