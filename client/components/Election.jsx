import React from 'react';
import styled from 'styled-components';
import Contest from './Contest.jsx';

const Election = (props) => {
  console.log('election data', props);

  const contests = props.contests.map((data) => <Contest {...data} />);

  const ElectionHeader = styled.div`
    padding: 20px 10px;
    display: flex;
    justify-content: center;
    font-size: 2em;
  `;
  return (
    <div>
      <div>
        <b>DATE:</b> {props.election.electionDay}
      </div>
      <div>
        <b>ADDRESS:</b> {props.election.pollingLocations[0].address.line1}
      </div>
      <ElectionHeader>Elections:</ElectionHeader>
      <div>{contests}</div>
    </div>
  );
};

export default Election;
