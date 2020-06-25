import React from 'react';
import styled from 'styled-components';
import Contest from './Contest.jsx';
import { access } from '../util';

const Election = (props) => {
  console.log('election data', props);

  const contests = props.contests || [];
  const election = props.election || props;
  const address = access(election).pollingLocations[0].address({});
  const { electionDay } = election;

  const children = contests.length ? (
    contests.map((data, i) => (
      <Contest {...data} key={`contest${i}`} state={address.state} />
    ))
  ) : (
    <div className = 'NoContest'>No available contest information.</div>
  );

  const ElectionHeader = styled.div`
    padding: 20px 10px;
    display: flex;
    justify-content: center;
    font-size: 2em;
  `;
  ElectionHeader.displayName = 'ElectionHeader'
  return (
    <div>
      <div>
        <b>date:</b> {electionDay}
      </div>
      <div>
        <b>address:</b> {address.line1}
      </div>
      <ElectionHeader>Elections:</ElectionHeader>
      <div>{children}</div>
    </div>
  );
};

export default Election;
