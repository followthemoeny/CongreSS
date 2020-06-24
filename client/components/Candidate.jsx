import React, { useState, useEffect } from 'react';
import { device } from '../components/style/device';
import styled from 'styled-components';
import Finances from './Finances.jsx';
import Plot from 'react-plotly.js';
import Session from '../Session.js';

const FinanceData = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    Session.getFinances(props.name, props.state)
      .then((data) => setData(data))
      .catch((err) => setData(undefined));
  }, []);

  if (data === null) {
    return <h1>Loading...</h1>;
  }
  if (!data) {
    return <h1>No financial information available for this candidate.</h1>;
  }

  console.log('financial data', data);
  const {
    individual_contributions,
    other_political_committee_contributions,
    operating_expenditures,
  } = data;

  const plotData = [
    {
      x: [1, 2, 3],
      y: [2, 6, 3],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'red' },
    },
    {
      type: 'bar',
      x: [1, 2, 3],
      y: [
        individual_contributions,
        other_political_committee_contributions,
        operating_expenditures,
      ],
    },
  ];

  return (
    <div style={{ border: '1px solid' }}>
      <Plot data={plotData} layout={{ width: 320, height: 240, title: 'A Fancy Plot' }} />
      <div>
        <b>individual contributions:</b> {individual_contributions}
      </div>
      <div>
        <b>politcal committee contributions:</b> {other_political_committee_contributions}
      </div>
      <div>
        <b>operating expenditures:</b> {operating_expenditures}
      </div>
    </div>
  );
};

const Candidate = (props) => {
  const CardWrapper = styled.div`
    display: flex;
    background-color: white;
    margin: 15px 15px 15px 15px;
    padding: 10px;
    max-width: 80vw;
    min-width: 80vw;
    border-radius: 4px;
    box-shadow: 2px 2px 5px -3px #000000;
    @media ${device.laptop} {
      max-width: 100px;
      min-width: 30vw;
    }
  `;
  console.log('candidate data', props);

  const [showFinances, setShowFinances] = useState(false);

  console.log('candidate data', props);
  const { name, party, state } = props;

  return (
    <div style={{ border: '1px solid' }}>
      <div>
        <b>name:</b> {name}
      </div>
      <div>
        <b>party:</b> {party}
      </div>
      <div>
        <button onClick={() => setShowFinances(!showFinances)}>
          {showFinances ? 'hide' : 'show'} finances
        </button>
        {showFinances ? <Finances name={name} state={state} /> : null}
      </div>
    </div>
  );
};

export default Candidate;
