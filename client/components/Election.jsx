import React from 'react';

import Candidate from './Candidate.jsx';

const Election = (props) => {
  console.log('election data', props);

  const candidates = props.candidates.map((data) => <Candidate {...data} />);

  return (
    <div>
      <div>
        <b>date:</b> {props.election.electionDay}
      </div>
      <div>
        <b>address:</b> {props.pollingLocations[0].address.line1}
      </div>
      <div>
        <b>candidates:</b>
        {candidates}
      </div>
    </div>
  );
};

export default Election;
