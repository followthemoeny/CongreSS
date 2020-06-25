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
    <div>No available contest information.</div>
  );

  const ElectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const ElectionHeader = styled.div`
    padding-top: 20px;
    display: flex;
    justify-content: center;
    font-size: 2em;
    font-weight: bold;
  `;

  ElectionHeader.displayName = 'ElectionHeader';

  const Date = styled.div`
    font-weight: bold;
    font-size: 1.4em;
    padding-bottom: 0.25em;
    color: red;
  `;

  const Address = styled(Date)`
    font-size: 1em;
    color: black;
  `;

  return (
    <ElectionWrapper>
      <Date>{electionDay}</Date>
      <Address>
        <b>Address:</b> {address.line1}
      </Address>
      <ElectionHeader>Contests:</ElectionHeader>
      <div>{children}</div>
    </ElectionWrapper>
  );
};

export default Election;
