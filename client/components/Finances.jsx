import React, { useState, useEffect } from 'react';
import Session from '../Session.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

const NoFinances = styled.h1`
  text-align: center;
`;

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
    return (
      <NoFinances>
        No financial information available for this candidate.
      </NoFinances>
    );
  }

  console.log('financial data', data);
  const {
    individual_contributions,
    other_political_committee_contributions,
    operating_expenditures,
  } = data;

  const chartData = {
    data: {
      datasets: [
        {
          label: 'individual contributions',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [individual_contributions],
        },
        {
          label: 'committee contributions',
          backgroundColor: 'rgba(75,0,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [other_political_committee_contributions],
        },
        {
          label: 'operating expenditures',
          backgroundColor: 'rgba(75,192,0,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [operating_expenditures],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Campaign Finances',
        fontSize: 20,
      },
      legend: {
        display: true,
        position: 'right',
      },
    },
  };

  return (
    <div>
      <Bar {...chartData} />
    </div>
  );
};

export default Finances;
