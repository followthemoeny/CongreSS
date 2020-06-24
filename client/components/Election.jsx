import React from 'react';

import Contest from './Contest.jsx';

const Election = (props) => {
  console.log('election data', props);

  const election = props.election || props;
  const { electionDay } = election;
  const address = election.pollingLocations ? election.pollingLocations[0].address : null;

  const contests = props.contests 
    ? props.contests.map((data, i) => <Contest {...data} key={`contest${i}`} state={address.state} />) 
    : <div>No available contest information.</div>;

  return (
    <div>
      <div>
        <b>date:</b> {electionDay}
      </div>
      <div>
        <b>address:</b> {address.line1}
      </div>
      <div>
        <b>contests:</b>
        {contests}
      </div>
    </div>
  );
};

export default Election;
