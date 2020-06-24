import React from 'react';

import Candidate from './Candidate.jsx';

const Contest = (props) => {
  console.log('election data', props);

  const { ballotTitle, type } = props;
  const candidates = props.candidates || [];

  const children = candidates.length 
    ? candidates.map((data, i) => (<Candidate {...data} key={`candidate${i}`} state={props.state} />))
    : (<div>No candidate information available.</div>);

  return (
    <div style={{border: '1px solid'}}>
      <div><b>ballot title:</b> {ballotTitle}</div>
      <div><b>type:</b> {type}</div>
      <div>
        <b>candidates:</b>
        {children}
      </div>
    </div>
  );
};

export default Contest;