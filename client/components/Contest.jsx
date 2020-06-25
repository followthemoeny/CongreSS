import React from 'react';
import styled from 'styled-components';

import Candidate from './Candidate.jsx';

const Contest = (props) => {
  console.log('election data', props);
  const candidates = props.candidates || [];
  const { ballotTitle, type } = props;

  const children = candidates.length ? (
    candidates.map((data, i) => (
      <Candidate {...data} key={`candidate${i}`} state={props.state} />
    ))
  ) : (
    <div>No candidate information available.</div>
  );

  const ContestWrapper = styled.div`
    padding: 15px;
    background-color: white;
  `;
  ContestWrapper.displayName = "ContestWrapper"
  return (
    <ContestWrapper>
      <div style={{ border: '1px solid' }}>
        <div>
          <b>ballot title:</b> {ballotTitle}
        </div>
        <div>
          <b>type:</b> {type}
        </div>
        <div>
          <b>candidates:</b>
          {children}
        </div>
      </div>
    </ContestWrapper>
  );
};

export default Contest;
