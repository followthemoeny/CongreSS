import React, { useState, useEffect } from 'react';
import Session from '../Session.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { access } from '../util';
import { WaveLoading } from 'react-loadingg';

const Finances = (props) => {
  const NoFinances = styled.h1`
    text-align: center;
  `;
  const [data, setData] = useState(null);

  useEffect(() => {
    Session.getFinances(props.name, props.state)
      .then((data) =>
        setTimeout(() => {
          setData(data);
        }, 650)
      )
      .catch((err) =>
        setTimeout(() => {
          setData(undefined);
        }, 650)
      );
  }, []);

  if (data === null) {
    console.log('LOADING HERE');
    return <WaveLoading size="large" color="#0052a5" />;
  }
  if (!data) {
    return <NoFinances>No financial information available for this candidate.</NoFinances>;
  }

  const personal = data;
  const committee = access(data).committees[0](null);

  const personalData = {
    height: '300px',
    maintainAspectRatio: false, 
    data: {
      datasets: [
        {
          label: 'individual contributions',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [personal.individual_contributions],
        },
        {
          label: 'committee contributions',
          backgroundColor: 'rgba(75,0,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [personal.other_political_committee_contributions],
        },
        {
          label: 'operating expenditures',
          backgroundColor: 'rgba(75,192,0,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [personal.operating_expenditures],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Personal',
        fontSize: 20,
      },
      legend: {
        display: true,
        position: 'bottom',
        align: 'start'
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: function(value, index, values) {
                return '$' + (value/1000) + 'k';
            }
          }
        }]
      }  
    },
  };
  const committeeData = committee ? {
    height: '300px',
    maintainAspectRatio: false,
    data: {
      datasets: [
        {
          label: 'individual contributions',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [committee.individual_contributions],
        },
        {
          label: 'transfers from affiliated committees',
          backgroundColor: 'rgba(75,0,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [committee.transfers_from_affiliated_committee],
        },
        {
          label: 'operating expenditures',
          backgroundColor: 'rgba(75,192,0,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [committee.operating_expenditures],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: committee.committee_name,
        fontSize: 20,
      },
      legend: {
        display: true,
        position: 'bottom',
        align: 'start'
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: function(value, index, values) {
                return '$' + (value/1000) + 'k';
            }
          }
        }]
      }  
    },
  } : null;

  return (
    <div>
      <Bar {...personalData} />
      {committeeData ? <Bar {...committeeData} /> : null}
    </div>
  );
};

export default Finances;
