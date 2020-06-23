import React from 'react';

import Contest from './Contest.jsx';

const Election = (props) => {
  console.log('election data', props);

  const contests = props.contests.map((data) =>
    <Contest {...data} />
  );

  return (
    <div>
      <div><b>date:</b> {props.election.electionDay}</div>
      <div><b>address:</b> {props.election.pollingLocations[0].address.line1}</div>
      <div>
        <b>candidates:</b>
        {contests}
      </div>
    </div>
  );
};

export default Election;