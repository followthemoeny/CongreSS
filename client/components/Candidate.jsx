import React, { useState, useEffect } from 'react';

import Session from '../Session.js';

const FinanceData = (props) => {
  const [ data, setData ] = useState(null);

  useEffect(() => {
    Session.getFinances(props.name, props.state)
    .then((data) => setData(data))
    .catch((err) => setData(undefined));
  }, []);

  console.log('financial data', data);

  if (data === null) {
    return (
      <h1>Loading...</h1>
    )
  }

  if (!data) {
    return (
      <h1>No financial information available for this candidate.</h1>
    )
  }

  const results = data.results ? data.results[0] || {} : {};
  const {
    individual_contributions, 
    other_political_committee_contributions, 
    operating_expenditures
  } = results;

  return (
    <div style={{border: '1px solid'}}>
      <div><b>individual contributions:</b> {individual_contributions}</div>
      <div><b>politcal committee contributions:</b> {other_political_committee_contributions}</div>
      <div><b>operating expenditures:</b> {operating_expenditures}</div>
    </div>
  );
};

const Candidate = (props) => {
  console.log('candidate data', props);

  const { name, party, state } = props;

  const [ showFinances, setShowFinances ] = useState(false);

  return (
    <div style={{border: '1px solid'}}>
      <div><b>name:</b> {name}</div>
      <div><b>party:</b> {party}</div>
      <div>
        <button onClick={() => setShowFinances(!showFinances)}>
          {showFinances ? 'hide' : 'show'} finances
        </button>
        {showFinances ? <FinanceData name={name} state={state} /> : null}
      </div>
    </div>
  );
};

export default Candidate;