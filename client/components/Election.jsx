import React from 'react';

import Contest from './Contest.jsx';

const Election = (props) => {
  console.log('election data', props);

<<<<<<< HEAD
  const candidates = props.candidates.map((data) => <Candidate {...data} />);

  return (
    <div>
      <div>
        <b>date:</b> {props.election.electionDay}
      </div>
      <div>
        <b>address:</b> {props.pollingLocations[0].address.line1}
      </div>
=======
  const contests = props.contests.map((data) =>
    <Contest {...data} />
  );

  return (
    <div>
      <div><b>date:</b> {props.election.electionDay}</div>
      <div><b>address:</b> {props.election.pollingLocations[0].address.line1}</div>
>>>>>>> 4ce9fbae4ea11bf740dc2b7335498810d3b4abe6
      <div>
        <b>candidates:</b>
        {contests}
      </div>
    </div>
  );
};

export default Election;
