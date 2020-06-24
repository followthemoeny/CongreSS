import React from 'react';
import Contest from './Contest.jsx';
import { access } from '../util';

const Election = (props) => {
  console.log('election data', props);

  const contests = props.contests || [];
  const election = props.election || props;
  const address = access(election).pollingLocations[0].address({});
  const { electionDay } = election;

  const children = contests.length
    ? contests.map((data, i) => <Contest {...data} key={`contest${i}`} state={address.state} />) 
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
        {children}
      </div>
    </div>
  );
};

export default Election;
