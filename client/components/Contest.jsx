import React from 'react';
import styled from 'styled-components';

import Candidate from './Candidate.jsx';

const Contest = (props) => {
  const candidates = props.candidates || [];
  const { ballotTitle, type } = props;

  const children = candidates.length ? (
    candidates.map((data, i) => (
      <Candidate {...data} key={`candidate${i}`} state={props.state} />
    ))
  ) : (
    <div className="NoCand">No candidate information available.</div>
  );

  const ContestWrapper = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const BallotTitle = styled(ContestWrapper)`
    font-size: 1.2em;
    padding: 0;
  `;
  ContestWrapper.displayName = 'ContestWrapper';

  const CandidatesWrapper = styled.div`
    font-weight: 1.4em;
  `;

  const Candidates = styled.div`
    font-size: 1.1em;
  `;
  return (
    <ContestWrapper>
      <BallotTitle>
        <p>{ballotTitle}</p>
      </BallotTitle>
      <div>
        <Candidates>
          <b>Candidates:</b>
        </Candidates>
        {children}
      </div>
    </ContestWrapper>
  );
};

export default Contest;
