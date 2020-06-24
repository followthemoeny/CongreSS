import React from 'react';
import styled from 'styled-components';

import Candidate from './Candidate.jsx';

const Contest = (props) => {
  console.log('election data', props);

  const candidates = props.candidates.map((data) => <Candidate {...data} />);

  const ContestWrapper = styled.div`
    padding: 15px;
    background-color: white;
  `;

  return (
    <ContestWrapper>
      <div>
        <b>ballot title:</b> {props.ballotTitle}
      </div>
      <div>
        <b>type:</b> {props.type}
      </div>
      <div>
        <b>candidates:</b>
        {candidates}
      </div>
    </ContestWrapper>
  );
};

export default Contest;
