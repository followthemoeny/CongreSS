import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Session from '../Session.js';

const Finances = (props) => {
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
        operating_expenditures
      ]
    }
  ];

  return (
    <div style={{ border: '1px solid' }}>
       <Plot data={plotData} layout={ {width: 320, height: 240, title: 'Financial Data'} } />
    </div>
  );
};

export default Finances;