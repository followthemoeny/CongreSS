import React from 'react';

import Candidate from './Candidate.jsx';

const Contest = (props) => {
  console.log('election data', props);

  const candidates = props.candidates.map((data) =>
    <Candidate {...data} />
  );

  return (
    <div style={{border: '1px solid'}}>
      <div><b>ballot title:</b> {props.ballotTitle}</div>
      <div><b>type:</b> {props.type}</div>
      <div>
        <b>candidates:</b>
        {candidates}
      </div>
    </div>
  );
};

export default Contest;